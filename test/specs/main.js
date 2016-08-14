import path from 'path';
import { parse } from 'flow-parser';
import { fail } from 'assert';
import fs from 'fs-promise';
import tmp from 'tmp-promise';
import { spawn } from 'child-process-promise';

describe('AWS SDK type declarations', function () {
  this.timeout(10000);
  let decls, declFile;
  const artifactPromises = [];
  const artifactsDir = path.resolve(__dirname, '..', 'artifacts');
  before(async () => {
    declFile = path.resolve(__dirname, '..', '..', 'aws-sdk.decls.js');
    decls = await fs.readFile(declFile, decls);
    try {
      await fs.mkdirp(artifactsDir);
    } catch (e) {
      if (e.error !== 'EEXIST') throw e;
    }
  });
  it('should parse with no errors', () => {
    const generatedAst = parseFlow(decls.toString('utf8'));
    if (generatedAst.errors && generatedAst.errors.length) {
      fail({errors: generatedAst.errors}, {errors: []}, 'Generated code has parse errors');
    }
  });
  describe('flow check', () => {
    let flowProjectDir, flowStdout, flowStderr;
    before(async () => {
      flowProjectDir = (await tmp.dir({unsafeCleanup: true})).path;
      await fs.writeFile(path.resolve(flowProjectDir, '.flowconfig'), '');
      await fs.copy(declFile, path.resolve(flowProjectDir, path.basename(declFile)));
      try {
        const {stdout, stderr} = await spawn(require('flow-bin'), ['check', '--show-all-errors'], {cwd: flowProjectDir, capture: ['stdout', 'stderr']});
        flowStdout = stdout.toString();
        flowStderr = stderr.toString();
      } catch (e) {
        const {stdout, stderr} = e;
        flowStdout = stdout.toString();
        flowStderr = stderr.toString();
        if (!flowStderr && !flowStdout) throw e;
      }
      const stdoutFile = path.resolve(artifactsDir, 'flow-stdout.txt');
      artifactPromises.push(fs.writeFile(stdoutFile, flowStdout));
    });
    it('should have no errors', () => {
      flowStdout.trim().should.match(/Found 0 errors$/);
    });
  });
  after(async () => {
    await Promise.all(artifactPromises);
  });
});

function parseFlow (src) {
  return parse(src, {
    esproposal_class_static_fields: true,
    esproposal_class_instance_fields: true
  });
}

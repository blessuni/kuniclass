import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const s=readFileSync(new URL('../src/App.tsx',import.meta.url),'utf8');
test('진행자 확인 뒤 역할 보기, 역할 확인 뒤 마음보석 선택, 선택 확인 뒤 작전회의',()=>{
 assert.match(s,/진행자 준비됐어요!/);
 assert.match(s,/onClick=\{\(\)=>go\('roles'\)\}[^\n]*진행자 준비됐어요!/);
 assert.match(s,/onClick=\{\(\)=>go\(s\.done\.length&&!s\.reviewing\?'activity':'select'\)\}/);
 assert.match(s,/onClick=\{\(\)=>go\('discussion'\)\}[^\n]*작전회의로 가요/);
 assert.match(s,/\{select:'roles',confirm:'select',roles:'leader',discussion:'confirm'/);
});
test('완성 화면에는 태블릿 안내 문구 없고 박수 효과음은 증폭',()=>{
 assert.doesNotMatch(s,/모둠장이? 태블릿을 들고 있어요/);
 assert.match(s,/const playCompleteSound=/);
 assert.match(s,/gain\.gain\.linearRampToValueAtTime\(\.9,/);
 assert.match(s,/onClick=\{\(\)=>\{playCompleteSound\(\);go\('complete'\)\}\}/);
});

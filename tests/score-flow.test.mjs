import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeFlow,moveTo,stageOf} from '../server/activity-flow.mjs';
const r={group:1,selected:['배려','책임'],done:['배려','책임'],screen:'score',extra:null,canva:true,score:4};
test('패들렛 후 다이아몬드 점수 화면이 새로고침에도 유지된다',()=>{const x=normalizeFlow(r);assert.equal(x.screen,'score');assert.equal(x.score,4);assert.match(stageOf(x),/점수/)});
test('점수 후 완료에서도 평가점수는 보존된다',()=>{const x=moveTo(r,'complete');assert.equal(x.screen,'complete');assert.equal(x.score,4);assert.match(stageOf(x),/박수/)});

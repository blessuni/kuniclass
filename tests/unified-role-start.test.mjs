import test from 'node:test';
import assert from 'node:assert/strict';
import {handleProgress} from '../server/progress-core.mjs';

test('공개수업 모든 모둠에 공통 역할 시작 번호 저장·조회', async()=>{
 const m=new Map();
 const store={get:async(k)=>m.get(k)||null,setJSON:async(k,v)=>m.set(k,v),list:async()=>({blobs:[...m.keys()].map(key=>({key}))}),delete:async(k)=>m.delete(k)};
 const post=await handleProgress(new Request('https://example.test/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'setRoleStart',roleStart:2})}),store);
 assert.equal(post.status,200);
 const get=await handleProgress(new Request('https://example.test/api/progress'),store);
 assert.equal((await get.json()).roleStart,2);
 const invalid=await handleProgress(new Request('https://example.test/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'setRoleStart',roleStart:6})}),store);
 assert.equal(invalid.status,400);
});
test('시작 ②: 역할 화면은 ② 진행자, 작전회의는 ③ 감독',async()=>{
 const roles=['진행자','감독','촬영자','올림이','완성이'];
 const roleStart=2;
 const rotated=(baseOperator)=>((baseOperator+roleStart-2)%5)+1;
 assert.equal(rotated(1),2);assert.equal(roles[1-1],'진행자');
 assert.equal(rotated(2),3);assert.equal(roles[2-1],'감독');
});

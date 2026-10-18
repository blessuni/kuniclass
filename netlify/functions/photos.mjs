import {getStore} from '@netlify/blobs';
const store=()=>getStore({name:'diamond-class-photos-v1',consistency:'strong'});
const headers={'Cache-Control':'no-store'};
export default async function(request){
 try{
  const s=store(),url=new URL(request.url),id=url.searchParams.get('id');
  if(request.method==='GET'&&id){if(!/^[a-z0-9-]+$/.test(id))return new Response('Bad id',{status:400});const blob=await s.get('image/'+id,{type:'arrayBuffer'});if(!blob)return new Response('Not found',{status:404});return new Response(blob,{headers:{...headers,'Content-Type':'image/jpeg'}})}
  if(request.method==='GET'){const index=await s.get('index',{type:'json'})||[];return Response.json({photos:index},{headers})}
  if(request.method==='POST'){
   const form=await request.formData(),file=form.get('photo'),group=Number(form.get('group'));
   if(!file||typeof file==='string'||!Number.isInteger(group)||group<1||group>6)return new Response('Bad upload',{status:400});
   if(file.type!=='image/jpeg'||file.size>4*1024*1024)return new Response('JPEG required, maximum 4MB',{status:400});
   const id=crypto.randomUUID(),names=['다람쥐','낙엽','잠자리','바람','참관교사','선생님'];
   await s.set('image/'+id,await file.arrayBuffer());
   const entry={id,group,filename:names[group-1]+'_'+new Date().toISOString().replace(/[:.]/g,'-')+'_'+String(form.get('index')||'1')+'.jpg',createdAt:Date.now()};
   const index=await s.get('index',{type:'json'})||[];index.unshift(entry);await s.setJSON('index',index.slice(0,200));
   return Response.json({ok:true,id},{headers});
  }
  return new Response('Method not allowed',{status:405});
 }catch(e){console.error(e);return Response.json({error:'사진 저장소 연결 실패'},{status:503,headers})}
}

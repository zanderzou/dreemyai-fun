const host="dreemyai.fun";
const key="b8899c5e7bb24988a9bd3ec807e7aaf4";
const urlList=[`https://${host}/`,`https://${host}/blog/`,`https://${host}/blog/dreemy-ai-vs-character-ai/`,`https://${host}/blog/dreemy-ai-vs-crushon-ai/`,`https://${host}/blog/is-dreemy-ai-safe/`,`https://${host}/about/`,`https://${host}/privacy/`,`https://${host}/terms/`,`https://${host}/editorial-policy/`,`https://${host}/contact/`];
const response=await fetch("https://api.indexnow.org/indexnow",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({host,key,keyLocation:`https://${host}/${key}.txt`,urlList})});
console.log(`IndexNow response: ${response.status} ${response.statusText}`);
if(!response.ok&&response.status!==202)process.exitCode=1;

(function(){
'use strict';
var $=function(s){return document.querySelector(s)}, $$=function(s){return Array.from(document.querySelectorAll(s))};
var db={get:function(k,d){try{var v=localStorage.getItem('shaer_'+k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){localStorage.setItem('shaer_'+k,JSON.stringify(v))}};
var st={mode:db.get('mode','mixed'),day:db.get('day',1),streak:db.get('streak',1),lex:db.get('lex',[]),poems:db.get('poems',[]),attempts:db.get('attempts',[]),meterKind:'classical',meter:''};
var labels={classical:'فصيح',nabati:'شعبي',mixed:'مشترك'};
var daily={
 read:['اقرأ ثلاثة أبيات بصوت مرتفع مرتين، ثم أعد أحدها من الذاكرة. ركّز على الموسيقى لا على التقطيع.','اختر بيتًا يعجبك. اقرأه ببطء ثم سريعًا، وحدد أين تقع النبرة التي تستريح لها الأذن.','اقرأ خمسة أبيات لشاعر واحد، ثم اكتب في سطر واحد ما الذي يميز لغته.'],
 image:['حوّل «اشتقت إلى البيت القديم» إلى صورة فيها شيء يُرى أو يُسمع.','صف مرور الزمن دون استعمال كلمات: زمن، عمر، أيام.','عبّر عن الفرح بصورة غير مباشرة تتجنب كلمة فرح.'],
 rhetoric:['اكتب تشبيهًا واحدًا ثم حاول تحويله إلى استعارة.','اكتب جملة خبرية عادية ثم اجعلها أقوى بالتقديم أو القصر.','اصنع مقابلة بين حالين: القرب/البعد أو الصمت/الكلام.'],
 craft:['اكتب بيتًا أو شطرين بالمعنى أولًا، ثم راجع الوزن بعد الانتهاء.','خذ فكرة بسيطة، اكتب لها ثلاث صيغ، ثم احذف أضعف الكلمات من الصيغة الأقوى.','اكتب بيتًا ثم اسأل عن كل كلمة: هل تخدم المعنى أم الوزن فقط؟']
};
var imagePrompts=[
 {p:'كبر الأبناء وانشغل كل واحد بحياته، وبقي الأب يشتاق إلى أيام اجتماعهم.',h:'ابحث عن مجلس قديم، باب، أصوات كانت تملأ المكان، أو مقاعد أصبحت فارغة.'},
 {p:'مرت سنوات كثيرة لكن الذكرى ما زالت حاضرة.',h:'اجعل الذكرى شيئًا يقاوم الغياب: نقش، جمر، عطر، ضوء.'},
 {p:'شخص يخفي حزنه أمام الناس.',h:'استخدم تضاد الظاهر والباطن: وجه هادئ وقلب مضطرب، أو نافذة مضيئة وبيت معتم.'},
 {p:'الطريق إلى الهدف طويل لكنه يستحق.',h:'حوّل الهدف إلى قمة أو ضوء أو باب، والطريق إلى تعب محسوس.'},
 {p:'الوفاء يبقى حتى مع البعد.',h:'اجعل الوفاء خيطًا أو عهدًا أو جذورًا لا يقطعها السفر.'}
];
var lessons=[
 ['التشبيه','ربط صورتين لاشتراكهما في صفة، بأداة ظاهرة أو مقدرة.','كأنَّ الصبرَ في صدره جبلٌ لا تهزّه الريح.','اكتب تشبيهًا للانتظار الطويل.'],
 ['الاستعارة','تشبيه حُذف أحد طرفيه، فيصير التصوير أكثر اندماجًا بالمعنى.','أوقد الشوقُ في القلب نافذةً لا تنام.','شبّه الحنين بالنار دون ذكر كلمة مثل أو كأن.'],
 ['الكناية','تعبير يقصد معنى بطريق غير مباشر مع إمكان إرادة المعنى الظاهر.','فلانٌ طويلُ النجاد؛ يراد بها طول القامة في الاستعمال القديم.','عبّر عن الكرم دون استعمال كلمة كريم.'],
 ['الطباق','جمع لفظين متضادين لتقوية المفارقة وإبراز المعنى.','أضحك في العلن وأبكي في الخفاء.','اكتب جملة فيها تضاد بين الليل والنهار.'],
 ['المقابلة','جمع معنيين أو أكثر ثم الإتيان بما يقابلها على الترتيب.','نقرب عند الرخاء، ونصبر عند الشدة.','اصنع مقابلة بين حال السفر وحال العودة.'],
 ['القصر','تخصيص أمر بآخر بأسلوب مثل: إنما، ما…إلا، أو التقديم بحسب السياق.','ما بقي من الدار إلا صداها.','حوّل: الذكرى تسكن القلب، إلى صيغة قصر.'],
 ['التقديم والتأخير','تغيير ترتيب عناصر الجملة لإبراز عنصر بعينه أو خدمة السياق والإيقاع.','في القلبِ منزلك؛ قُدّم الجار والمجرور لإبرازه.','اكتب جملتين للمعنى نفسه وغيّر ما تقدمه فيهما.'],
 ['الحذف والإيجاز','ترك ما يفهم من السياق أو تقليل الكلمات مع بقاء المعنى قويًا.','سألتُ الدارَ… فسكتت.','اكتب عبارة من عشر كلمات ثم اختصرها إلى ست دون خسارة المعنى.']
];
var meters={
 classical:[
  ['الكامل','متفاعلن متفاعلن متفاعلن','بحر قوي مرن، مناسب للحماسة والوصف، وله زحافات وصور متعددة.'],
  ['الوافر','مفاعلتن مفاعلتن فعولن','إيقاع واضح ولين، ويكثر في الوجد والحكمة.'],
  ['الطويل','فعولن مفاعيلن فعولن مفاعلن','من أشهر بحور القصيدة العربية، واسع للنفس والسرد والمعاني الطويلة.'],
  ['البسيط','مستفعلن فاعلن مستفعلن فاعلن','بحر واضح الحركة يجمع بين السعة والخفة.']
 ],
 nabati:[
  ['المسحوب','إيقاع نبطي شائع ذو جرس متوازن','له صور أداء متعددة؛ لا يصح إجباره دائمًا على كتابة تفعيلات خليلية حرفية.'],
  ['الهجيني','إيقاع غنائي/إنشادي خفيف','تتنوع صوره بحسب البيئة والأداء والسماع هو المرجع المهم.'],
  ['الصخري','وزن نبطي ذو أداء مميز','يستفاد من السماع ومضاهاة الشطر بالنموذج أكثر من الاعتماد على الرسم الإملائي وحده.'],
  ['الهلالي','من الأوزان السردية الممتدة في النبطي','توجد له روايات وصور أداء؛ درّب أذنك على نموذج موثوق ثم حاكه.']
 ]
};
var prose=['مرت الأيام وتغير الناس، لكن الإنسان يظل يبحث عن الوجوه التي عرفها في بداياته.','قد يكون الصمت أبلغ من الاعتذار إذا جاءت الكلمات متأخرة.','لا تعرف قيمة البيت إلا حين تطول بك الطرق بعيدًا عنه.','ليس كل من ابتعد نسي؛ بعض الغياب يحفظ الود أكثر مما تفعله المجالس.','النجاح لا يأتي دفعة واحدة، بل من محاولات صغيرة لا يراها أحد.'];
var ii=0,pi=0,deferred=null;
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function save(){db.set('mode',st.mode);db.set('day',st.day);db.set('streak',st.streak);db.set('lex',st.lex);db.set('poems',st.poems);db.set('attempts',st.attempts)}
function stats(){$('#day').textContent=st.day;$('#streak').textContent=st.streak;$('#wordN').textContent=st.lex.length;$('#poemN').textContent=st.poems.length}
function modeUI(){$$('#modes button').forEach(function(b){b.classList.toggle('on',b.dataset.mode===st.mode)})}
function dailyUI(){var m=labels[st.mode];var items=[['الأذن',pick(daily.read)],['الصورة',pick(daily.image)],['البلاغة',pick(daily.rhetoric)],['الصياغة',pick(daily.craft)]];$('#daily').innerHTML=items.map(function(x){return '<article class="daily"><b>'+x[0]+' · '+m+'</b><p>'+x[1]+'</p></article>'}).join('')}
function imageUI(){var o=imagePrompts[ii%imagePrompts.length];$('#imagePrompt').textContent=o.p;$('#imageHint').classList.add('hide');$('#imageHint').textContent='';$('#imageText').value='';$('#imageTools').innerHTML=['حاسة بصرية','صوت','حركة','مكان','زمن','مفارقة'].map(function(x){return '<span class="chip">'+x+'</span>'}).join('')}
function rhetoricUI(){$('#lessons').innerHTML=lessons.map(function(r,i){return '<article class="lesson"><button data-i="'+i+'"><span>'+r[0]+'</span><span>＋</span></button><div class="body"><p>'+r[1]+'</p><p><b>مثال:</b> '+r[2]+'</p><p><b>تمرين:</b> '+r[3]+'</p></div></article>'}).join('');$$('.lesson>button').forEach(function(b){b.onclick=function(){b.parentElement.classList.toggle('open')}})}
function proseUI(){$('#prosePrompt').textContent=prose[pi%prose.length];['#s1','#s2','#s3','#s4'].forEach(function(x){$(x).value=''})}
function meterUI(){$$('#meterKinds button').forEach(function(b){b.classList.toggle('on',b.dataset.kind===st.meterKind)});var a=meters[st.meterKind];if(!st.meter||!a.some(function(x){return x[0]===st.meter}))st.meter=a[0][0];$('#chosenMeter').value=st.meter;$('#meters').innerHTML=a.map(function(m){return '<article class="metercard '+(m[0]===st.meter?'on':'')+'" data-meter="'+m[0]+'"><h3>'+m[0]+'</h3><div class="pattern">'+m[1]+'</div><p>'+m[2]+'</p></article>'}).join('');$$('.metercard').forEach(function(c){c.onclick=function(){st.meter=c.dataset.meter;meterUI()}})}
function lexUI(){stats();if(!st.lex.length){$('#lexList').innerHTML='<div class="feedback">دفترك فارغ. أضف كلمة أو صورة أو تركيبًا أعجبك أثناء القراءة.</div>';return}$('#lexList').innerHTML=st.lex.slice().reverse().map(function(x,ri){var i=st.lex.length-1-ri;return '<article class="lexcard"><small>'+esc(x.type)+' · '+labels[x.mode]+'</small><h3>'+esc(x.text)+'</h3><p>'+esc(x.note)+'</p><div class="cardactions"><button data-copy="'+i+'">نسخ</button><button class="danger" data-del="'+i+'">حذف</button></div></article>'}).join('');$$('[data-copy]').forEach(function(b){b.onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(st.lex[+b.dataset.copy].text)}});$$('[data-del]').forEach(function(b){b.onclick=function(){st.lex.splice(+b.dataset.del,1);save();lexUI()}})}
function poemUI(){stats();if(!st.poems.length){$('#poemList').innerHTML='<div class="feedback">لا توجد نصوص محفوظة بعد.</div>';return}$('#poemList').innerHTML=st.poems.slice().reverse().map(function(x,ri){var i=st.poems.length-1-ri;return '<article class="poemcard"><small>'+labels[x.mode]+' · '+esc(x.meter||'بلا بحر محدد')+(x.rhyme?' · روي '+esc(x.rhyme):'')+'</small><h3>'+esc(x.title||'مسودة بلا عنوان')+'</h3><pre>'+esc(x.text)+'</pre><div class="cardactions"><button data-pcopy="'+i+'">نسخ</button><button class="danger" data-pdel="'+i+'">حذف</button></div></article>'}).join('');$$('[data-pcopy]').forEach(function(b){b.onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(st.poems[+b.dataset.pcopy].text)}});$$('[data-pdel]').forEach(function(b){b.onclick=function(){st.poems.splice(+b.dataset.pdel,1);save();poemUI()}})}
function savePoem(o){if(!o.text.trim()){alert('اكتب نصًا أولًا.');return}st.poems.push({title:o.title||'مسودة',mode:o.mode||'mixed',meter:o.meter||'',rhyme:o.rhyme||'',text:o.text,date:new Date().toISOString()});save();poemUI();alert('حُفظ النص في قصائدي.')}
function navigate(id){$$('.page').forEach(function(p){p.classList.toggle('on',p.id===id)});$$('.nav button').forEach(function(b){b.classList.toggle('on',b.dataset.page===id)});scrollTo({top:0,behavior:'smooth'})}
function bind(){
 $$('.nav button').forEach(function(b){b.onclick=function(){navigate(b.dataset.page)}});
 $$('#modes button').forEach(function(b){b.onclick=function(){st.mode=b.dataset.mode;save();modeUI();dailyUI()}});
 $('#refresh').onclick=dailyUI;
 $('#nextImage').onclick=function(){ii++;imageUI()};
 $('#showImageHint').onclick=function(){var o=imagePrompts[ii%imagePrompts.length];$('#imageHint').innerHTML='<b>اتجاه لا إجابة جاهزة:</b> '+o.h;$('#imageHint').classList.remove('hide')};
 $('#saveImage').onclick=function(){var v=$('#imageText').value.trim();if(!v)return alert('اكتب محاولتك أولًا.');st.attempts.push({type:'image',text:v,date:Date.now()});save();alert('حُفظت المحاولة.')};
 $('#nextProse').onclick=function(){pi++;proseUI()};
 $('#saveProse').onclick=function(){savePoem({title:'تمرين من النثر إلى الشعر',mode:st.mode,text:$('#s4').value||$('#s3').value||$('#s2').value||$('#s1').value})};
 $$('#meterKinds button').forEach(function(b){b.onclick=function(){st.meterKind=b.dataset.kind;st.meter='';meterUI()}});
 $('#meterHelp').onclick=function(){var t=$('#meterText').value.trim(),r=$('#rhyme').value.trim();if(!t)return alert('اكتب البيت أولًا.');var lines=t.split(/\n+/).filter(Boolean),same=!r||lines.every(function(l){return l.trim().endsWith(r)});var msg='البحر المختار: <b>'+esc(st.meter)+'</b>.<br>عدد الأسطر/الأشطر المدخلة: '+lines.length+'.<br>'+(r?(same?'الروي «'+esc(r)+'» ظاهر في النهايات المدخلة.':'بعض النهايات لا تنتهي بالروي «'+esc(r)+'». راجع القافية.'):'لم تحدد حرف الروي بعد.')+'<br><br><b>مهم:</b> هذا فحص شكلي. الحكم العروضي يحتاج قراءة صوتية وضبط الحركات والزحافات والعلل.';$('#meterFeedback').innerHTML=msg;$('#meterFeedback').classList.remove('hide')};
 $('#meterSave').onclick=function(){savePoem({title:'بيت للتدريب',mode:st.meterKind,meter:st.meter,rhyme:$('#rhyme').value.trim(),text:$('#meterText').value.trim()})};
 $('#addLex').onclick=function(){var t=$('#lexText').value.trim();if(!t)return alert('اكتب الكلمة أو التعبير.');st.lex.push({text:t,type:$('#lexType').value,mode:$('#lexMode').value,note:$('#lexNote').value.trim()});save();$('#lexText').value='';$('#lexNote').value='';lexUI()};
 $('#quizLex').onclick=function(){if(!st.lex.length)return alert('أضف بطاقات أولًا.');var x=pick(st.lex);alert(x.text+'\n\n'+(x.note||'حاول استخدامها الآن في جملة أو صورة شعرية.'))};
 $('#savePoem').onclick=function(){savePoem({title:$('#poemTitle').value.trim(),mode:$('#poemMode').value,meter:$('#poemMeter').value.trim(),rhyme:$('#poemRhyme').value.trim(),text:$('#poemText').value.trim()})};
}
function dayCheck(){var today=new Date().toISOString().slice(0,10),last=db.get('lastDay','');if(last&&last!==today){var d=Math.round((new Date(today)-new Date(last))/86400000);st.streak=d===1?st.streak+1:1;st.day=Math.min(90,st.day+1);save()}db.set('lastDay',today)}
function pwa(){if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js');window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;$('#install').classList.remove('hide')});$('#install').onclick=async function(){if(!deferred)return;deferred.prompt();await deferred.userChoice;deferred=null;$('#install').classList.add('hide')}}
dayCheck();stats();modeUI();dailyUI();imageUI();rhetoricUI();proseUI();meterUI();lexUI();poemUI();bind();pwa();
})();
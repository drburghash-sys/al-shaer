(function(){
'use strict';
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.from(document.querySelectorAll(s))};
var DB={get:function(k,d){try{var v=localStorage.getItem('shaer2_'+k);return v?JSON.parse(v):d}catch(e){return d}},set:function(k,v){localStorage.setItem('shaer2_'+k,JSON.stringify(v))}};
var reviewIntervals=[1,3,7,14,30];

var lessons=[
{
 id:'d1',theme:'الحنين يبدأ من مكان محسوس',focus:'لا تقل «أشتاق» فقط؛ اجعل للحنين مكانًا وصوتًا وصورة.',
 classical:{poet:'امرؤ القيس',poem:'معلقة امرئ القيس',a:'قِفا نَبكِ مِن ذِكرى حَبيبٍ وَمَنزِلِ',b:'بِسِقطِ اللِّوى بَينَ الدَّخولِ فَحَومَلِ',meter:'الطويل',pattern:'فعولن مفاعيلن فعولن مفاعلن',rhyme:'ل',source:'https://qafiyah.com/poems/rHUD',meaning:'يطلب من صاحبيه الوقوف معه ليستعيد ذكرى الحبيب والمنزل في مواضع محددة.',image:'الذكرى ليست فكرة عائمة؛ صارت أرضًا يقف عليها الشاعر ويشير إلى معالمها.',rhetoric:'«قِفا» أمر خرج إلى الالتماس والمشاركة، وفي الجمع بين الحبيب والمنزل ربطٌ بين العاطفة والمكان.',craft:'بدأ بفعل قصير قوي، ثم نقلنا فورًا من الانفعال إلى مكان محدد؛ لذلك لا يبدو الحزن تقريرًا مجردًا.'},
 folk:{poet:'محمد بن لعبون',poem:'يا علي',a:'يا علي صحت بالصوت الرفيع',b:'يا مرّة لا تذبّين القناع',meter:'المديد الشعبي / اللعبوني',pattern:'نموذج المديد في الأداء الشعبي؛ يُحفظ بالنطق والإيقاع قبل التقطيع',rhyme:'ع',source:'https://folk.aldiwan.net/poems/126322',meaning:'ينادي صاحبه بصوت مرتفع طالبًا منه أن يبلغ المرأة ألا تسدل القناع.',image:'النداء العالي والقناع يصنعان مشهدًا مسموعًا ومرئيًا بدل وصف الشوق مباشرة.',rhetoric:'نداء وأمر، مع تكرار «يا» الذي يرفع حرارة الخطاب ويعطيه جرسًا غنائيًا.',craft:'دخل إلى المشهد مباشرة بالنداء، ولم يمهّد بشرح مشاعره؛ الحركة سبقت التفسير.'}
},
{
 id:'d2',theme:'التشبيه لا يزيّن المعنى؛ بل يجعله يُرى',focus:'ابحث عن شيء محسوس يشبه أثر المعنى، لا عن صفة عامة.',
 classical:{poet:'طرفة بن العبد',poem:'معلقة طرفة',a:'لِخَولةَ أطلالٌ ببُرقةِ ثَهمَدِ',b:'تلوحُ كباقي الوَشمِ في ظاهرِ اليدِ',meter:'الطويل',pattern:'فعولن مفاعيلن فعولن مفاعلن',rhyme:'د',source:'https://qafiyah.com/poems/xjIC',meaning:'يرى آثار ديار خولة في برقة ثهمد، وما بقي منها يظهر خافتًا.',image:'شبّه بقايا الأطلال بأثر الوشم الباقي على ظاهر اليد؛ صورة دقيقة للشيء الذي بهت ولم يختف.',rhetoric:'تشبيه صريح بأداة الكاف: الأطلال الباقية كأثر الوشم.',craft:'اختار تشبيهًا يطابق درجة الظهور لا شكل المكان فقط؛ «تلوح» و«باقي الوشم» يعملان معًا.'},
 folk:{poet:'محمد بن لعبون',poem:'يا علي',a:'شاقني يا علي قمرا وربيع',b:'يوم أنا آمر وكل أمري مطاع',meter:'المديد الشعبي / اللعبوني',pattern:'نموذج المديد في الأداء الشعبي؛ راقب الجرس وتساوي النفس',rhyme:'ع',source:'https://folk.aldiwan.net/poems/126322',meaning:'يستعيد زمنًا جميلاً جمع في ذاكرته البدر والربيع والقوة والقبول.',image:'«قمر وربيع» صورتان للبهاء والخصب، اختصر بهما زمنًا كاملًا من السعادة.',rhetoric:'تكثيف رمزي؛ القمر والربيع ليسا مجرد زمنين بل علامتان للجمال والامتلاء.',craft:'بدل أن يقول «اشتقت لأيام جميلة» وضع أمامنا قمرًا وربيعًا ثم أعقبهما بسبب شخصي.'}
},
{
 id:'d3',theme:'خاطب الصامت كي تكشف قوة الغياب',focus:'التشخيص يجعل المكان شريكًا في التجربة.',
 classical:{poet:'زهير بن أبي سلمى',poem:'معلقة زهير',a:'أَمِن أُمِّ أَوفى دِمنَةٌ لَم تَكَلَّمِ',b:'بِحَومانَةِ الدُرّاجِ فَالمُتَثَلَّمِ',meter:'الطويل',pattern:'فعولن مفاعيلن فعولن مفاعلن',rhyme:'م',source:'https://qafiyah.com/poems/gnNg',meaning:'يتساءل عن بقايا ديار أم أوفى التي صمتت ولم تجبه.',image:'الخرائب تبدو ككائن كان يمكن أن يتكلم لكنه اختار الصمت.',rhetoric:'استفهام، وتشخيص ضمني في إسناد الكلام إلى الدمنة ثم نفيه عنها.',craft:'حوّل غياب البشر إلى صمتٍ للمكان؛ فصار الفراغ نفسه جزءًا من المعنى.'},
 folk:{poet:'تركي بن حميد',poem:'وصية لعبيد',a:'ياما حلا يا عبيد في وقت الاسفار',b:'جذب الفراش وشبّ ضوّ المناره',meter:'المسحوب',pattern:'مستفعلن مستفعلن فاعلاتن — مع مراعاة النطق الشعبي',rhyme:'ر',source:'https://www.alduwaser.org/vb/showthread.php?t=360',meaning:'يصف متعة وقت السحر حين ينهض الرجل ويشعل النار ويهيئ مجلسه.',image:'الفراش والنار وضوء المنارة تفاصيل يومية تحوّل الحكمة إلى مشهد حي.',rhetoric:'افتتاح تعجبي «ياما حلا» ثم تعداد أفعال حسية متتابعة.',craft:'لم يقل «السحر جميل»؛ أعطاك سلسلة أفعال صغيرة تجعلك تعيش اللحظة.'}
},
{
 id:'d4',theme:'الزمن يظهر في أثره لا في اسمه',focus:'بدل قول «مر الزمن» صف ما صنعه في المكان أو الجسد.',
 classical:{poet:'لبيد بن ربيعة',poem:'معلقة لبيد',a:'عَفَتِ الدِّيارُ مَحَلُّها فَمُقامُها',b:'بِمِنىً تَأَبَّدَ غَوْلُها فَرِجامُها',meter:'الكامل',pattern:'متفاعلن متفاعلن متفاعلن',rhyme:'م',source:'https://maatharah.com/poetry-guide/poem-analysis/labid-muallaqa.html',meaning:'درست الديار وخَلَت مواضع الحلول والإقامة، واستوحشت الأماكن التي يسميها.',image:'الزمن لا يظهر لفظًا؛ أثره هو المحو والوحشة.',rhetoric:'مراعاة نظير بين «محلها فمقامها» وتتابع أسماء المواضع، مع قوة الفعل «عفت».',craft:'افتتح بالفعل الذي يحمل النتيجة كاملة، ثم وسّع الصورة بالمكان؛ لا حشو ولا شرح زائد.'},
 folk:{poet:'تركي بن حميد',poem:'يا راكب اللي بقلهن قد تثنّى',a:'يا راكب اللي بقلهن قد تثنّى',b:'فجّ العضود مدمّثات المحاصير',meter:'المسحوب',pattern:'مستفعلن مستفعلن فاعلاتن — بحسب النطق الشعبي',rhyme:'ر',source:'https://www.alsh3r.com/poems/view/29316',meaning:'ينادي راكبًا على نوق موصوفة بالقوة والهيئة، تمهيدًا للرسالة والحركة.',image:'الوصف يركّز على الجسد والحركة، فيرى السامع المطية قبل أن تبدأ الرحلة.',rhetoric:'نداء ووصف متتابع، وفي اختيار الصفات تكثيف للحركة والقوة.',craft:'في شعر الرحلة لا يبدأ بالهدف وحده؛ يصنع وسيلة الرحلة نفسها لتصبح جزءًا من البطولة.'}
},
{
 id:'d5',theme:'ابدأ بسؤال أو صورة تفتح المعنى بدل أن تغلقه',focus:'البيت القوي يترك للقارئ مساحة يشارك فيها.',
 classical:{poet:'عنترة بن شداد',poem:'معلقة عنترة',a:'هَل غادَرَ الشُعَراءُ مِن مُتَرَدَّمِ',b:'أَم هَل عَرَفتَ الدارَ بَعدَ تَوَهُّمِ',meter:'الكامل',pattern:'متفاعلن متفاعلن متفاعلن',rhyme:'م',source:'https://qafiyah.com/poems/iaqM',meaning:'يسأل: هل ترك الشعراء السابقون معنى لم يقولوه؟ ثم يحاول التعرف إلى الدار بعد التباسها.',image:'ينتقل من «ترميم» ما تركه السابقون إلى محاولة تمييز دار باهتة؛ سؤالان يفتحان القصيدة.',rhetoric:'استفهامان متتابعان؛ الأول نقدي عن الشعر، والثاني وجداني عن المكان.',craft:'بدل ادعاء التجديد، بدأ بالشك في إمكان التجديد نفسه؛ وهذا يصنع توترًا ذكيًا.'},
 folk:{poet:'محسن الهزاني',poem:'بروق تلالا',a:'يالله بنو مدلهم الخيالا',b:'طافح ربابه مثل شرد المها الزرق',meter:'المسحوب',pattern:'مستفعلن مستفعلن فاعلاتن — نموذج شائع للمسحوب',rhyme:'ق',source:'https://www.aljblan.net/vb/showthread.php?t=4491',meaning:'يدعو الله بسحاب كثيف ممتلئ بالمطر، ثم يشبه منظره بقطيع المها المتفرق.',image:'السحاب يتحول إلى كائنات بيضاء متحركة في السماء؛ صورة واسعة وحية.',rhetoric:'تشبيه صريح «مثل شرد المها الزرق» بعد تمهيد بصري للسحاب.',craft:'بنى الصورة على اللون والحركة والامتلاء، لذلك صار الدعاء مشهدًا لا عبارة مجردة.'}
},
{
 id:'d6',theme:'النبرة الإنشائية تعطي البيت قوة فورية',focus:'الأمر والنداء والاستفهام أدوات بناء، لا مجرد قواعد نحوية.',
 classical:{poet:'عمرو بن كلثوم',poem:'معلقة عمرو بن كلثوم',a:'أَلا هُبّي بِصَحنِكِ فَاَصبَحينا',b:'وَلا تُبقي خُمورَ الأَندَرينا',meter:'الوافر',pattern:'مفاعلتن مفاعلتن فعولن',rhyme:'ن',source:'https://qafiyah.com/poems/YksA',meaning:'يفتتح بطلب مباشر إلى الساقية أن تسقيهم وألا تدخر خمر الأندر.',image:'الصحن والحركة والفعل المباشر تضع السامع داخل مجلس لا أمام وصف له.',rhetoric:'«ألا» للتنبيه، ثم أمران متتابعان؛ النبرة حاضرة وقوية من أول لفظة.',craft:'لا مقدمة ولا وصف للمزاج؛ الأمر نفسه هو الذي يصنع الجو والنبرة.'},
 folk:{poet:'راشد الخلاوي',poem:'من شعره الهلالي',a:'حاضر الراي صايبه',b:'مصاب الحشا ما دهي بادها مصايبه',meter:'الهلالي',pattern:'فعولن مفاعيلن فعولن مفاعلن — من أشهر قوالبه',rhyme:'ب',source:'https://www.dhofari.com/vb/archive/index.php/t-22519.html',meaning:'يقابل بين صاحب الرأي الحاضر المصيب وبين من أصيب قلبه بما أثقله من المصائب.',image:'الحشا المصاب يجعل الهم جرحًا داخليًا محسوسًا لا فكرة ذهنية.',rhetoric:'مقابلة بين صفاء الرأي وإصابة الحشا، مع تكرار جذر «صاب» بتلوينات مختلفة.',craft:'قوة البيت في التوازي الصوتي والمعنوي؛ اللفظة نفسها تتغير دلالتها داخل السياق.'}
},
{
 id:'d7',theme:'الحكمة تصبح شعرًا حين تمر عبر تجربة محسوسة',focus:'لا تكتب حكمة كشعار؛ أعطها نارًا أو طريقًا أو أثرًا.',
 classical:{poet:'الحارث بن حلزة',poem:'معلقة الحارث بن حلزة',a:'آذَنَتنا بِبَينِها أَسماءُ',b:'رُبَّ ثاوٍ يُمَلُّ مِنهُ الثَواءُ',meter:'الخفيف',pattern:'فاعلاتن مستفعلن فاعلاتن',rhyme:'ء',source:'https://qafiyah.com/poems/xxWN',meaning:'أخبرته أسماء بفراقها، ثم يقرر حكمة: قد يُملّ حتى ممن يطول مقامه.',image:'الفراق خبر يصل فجأة، ثم يقابله معنى الإقامة الطويلة التي قد تورث الملل.',rhetoric:'مفارقة بين البين والثواء، وبين الرحيل والإقامة؛ والجملة الثانية تجري مجرى الحكمة.',craft:'وصل التجربة الخاصة بحكمة عامة؛ لذلك لا تبقى القصيدة شكوى فردية.'},
 folk:{poet:'راشد الخلاوي',poem:'من شعره الهلالي',a:'ومشطون حالٍ بات يصلى على لظا',b:'مغلوف معلوقٍ والأكباد ذايبه',meter:'الهلالي',pattern:'فعولن مفاعيلن فعولن مفاعلن — مع صور نبطية مسموعة',rhyme:'ب',source:'https://www.dhofari.com/vb/archive/index.php/t-22519.html',meaning:'يصف صاحب حالٍ مشدودٍ بالهم كأنه يبيت على نار، والقلوب من شدة الوجد تذوب.',image:'الهم نار يُصلى عليها، والكبد تذوب؛ الألم النفسي صار حرارة ومادة.',rhetoric:'استعارة حسية ممتدة: لظى وذوبان لنقل شدة الوجد.',craft:'لو قال «أنا مهموم» لضاع معظم الأثر؛ اختار الحرارة والذوبان ليجعل الألم محسوسًا.'}
}
];

var meterLibrary={
 classical:[
  {n:'الطويل',p:'فعولن مفاعيلن فعولن مفاعلن',d:'واسع النفس، كثير في المعلقات والسرد والحكمة. للبحر صور وزحافات لا تختصرها هذه الصيغة التعليمية.'},
  {n:'الكامل',p:'متفاعلن متفاعلن متفاعلن',d:'قوي الحركة، مناسب للفخر والوصف والانفعال.'},
  {n:'الوافر',p:'مفاعلتن مفاعلتن فعولن',d:'لين الجرس مع قوة، يكثر في الوجد والفخر.'},
  {n:'البسيط',p:'مستفعلن فاعلن مستفعلن فعلن',d:'متوازن ومرن في الوصف والحكمة.'},
  {n:'الخفيف',p:'فاعلاتن مستفعلن فاعلاتن',d:'جرس خفيف واضح؛ منه معلقة الحارث بن حلزة.'},
  {n:'الرجز',p:'مستفعلن مستفعلن مستفعلن',d:'إيقاع مباشر، كثير الاستعمال في الارتجال والتعليم.'},
  {n:'الرمل',p:'فاعلاتن فاعلاتن فاعلاتن',d:'إيقاع هادئ غنائي في كثير من صوره.'},
  {n:'المتقارب',p:'فعولن فعولن فعولن فعولن',d:'نبض متقارب قوي، مشهور في السرد والحماسة.'}
 ],
 folk:[
  {n:'المسحوب',p:'مستفعلن مستفعلن فاعلاتن',d:'من أشهر أوزان النبطي. الكتابة الشعبية تُقرأ كما تُنطق، لذلك لا يكفي الرسم الإملائي للفحص.'},
  {n:'الهلالي',p:'فعولن مفاعيلن فعولن مفاعلن',d:'من أقدم الأوزان الشعبية وقريب من الطويل الفصيح، وتوجد له صور أداء ورواية.'},
  {n:'الهجيني الطويل',p:'قريب من البسيط في بعض التصنيفات',d:'تختلف تسمياته وصوره بين المدارس الشعبية.'},
  {n:'الهجيني القصير',p:'وزن شعبي مستقل في بعض التصنيفات',d:'الأداء والسماع عنصران أساسيان لضبطه.'},
  {n:'الصخري',p:'يربطه بعض الباحثين بالوافر',d:'توجد خلافات في رده إلى البحور الخليلية؛ المرجع السمعي مهم.'},
  {n:'الحداء / الرجز',p:'مبني على نبض الرجز في كثير من صوره',d:'قصير الحركة ومرتبط بالإنشاد والعمل والسير.'},
  {n:'المديد الشعبي',p:'من فروع المديد المستعملة شعبيًا',d:'تدخل فيه نصوص غنائية، ومنها نماذج لعبونية.'},
  {n:'الفنون اللعبونية',p:'أسرة أوزان وألحان لا قالب واحد',d:'ارتبطت بمحمد بن لعبون، فلا يصح اختزالها كلها في تفعيلة واحدة.'}
 ]
};

var st={
 current:DB.get('current',0),
 completed:DB.get('completed',{}),
 reviews:DB.get('reviews',{}),
 drafts:DB.get('drafts',[]),
 errors:DB.get('errors',[]),
 meterTab:'classical',
 checks:{c:false,f:false},
 revision:{c:false,f:false},
 recall:{c:0,f:0}
};
var viewIndex=st.current,deferred=null;

function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function save(){DB.set('current',st.current);DB.set('completed',st.completed);DB.set('reviews',st.reviews);DB.set('drafts',st.drafts);DB.set('errors',st.errors)}
function arNum(n){return String(n).replace(/\d/g,function(d){return '٠١٢٣٤٥٦٧٨٩'[d]})}
function normalize(s){return String(s||'').toLowerCase().replace(/[\u064b-\u065f\u0670]/g,'').replace(/[إأآٱ]/g,'ا').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ة/g,'ه').replace(/[^ء-ي\s]/g,' ').replace(/\s+/g,' ').trim()}
function tokens(s){var n=normalize(s);return n?n.split(' '):[]}
function lcsScore(ref,input){var a=tokens(ref),b=tokens(input);if(!a.length||!b.length)return 0;var dp=Array(b.length+1).fill(0);for(var i=1;i<=a.length;i++){var prev=0;for(var j=1;j<=b.length;j++){var old=dp[j];dp[j]=a[i-1]===b[j-1]?prev+1:Math.max(dp[j],dp[j-1]);prev=old}}return Math.round(100*dp[b.length]/Math.max(a.length,b.length))}
function fullVerse(v){return v.a+' '+v.b}
function splitCandidate(s){var t=String(s||'').trim();var p=t.split(/\n+|\s[\/|=—–]\s/).map(function(x){return x.trim()}).filter(Boolean);return p.length>=2?[p[0],p.slice(1).join(' ')]:null}
function pulse(s){var n=normalize(s).replace(/\s/g,'');if(!n)return 0;var longs=(n.match(/[اوي]/g)||[]).length;var letters=n.length;return letters+Math.round(longs*.45)}
function rhythmResult(candidate,ref){
 var parts=splitCandidate(candidate);if(!parts)return {ok:false,needsSplit:true,html:'افصل الشطرين بسطر جديد أو بعلامة <b>/</b>. لا أستطيع حتى الفحص التقريبي إذا كان الشطران ملتصقين.'};
 var target=[pulse(ref.a),pulse(ref.b)],got=[pulse(parts[0]),pulse(parts[1])],issues=[];
 for(var i=0;i<2;i++){var r=target[i]?got[i]/target[i]:1;if(r>1.16)issues.push('الشطر '+(i===0?'الأول':'الثاني')+' يبدو أطول من النموذج؛ راجع خصوصًا الكلمات الزائدة قرب منتصفه ونهايته.');else if(r<.84)issues.push('الشطر '+(i===0?'الأول':'الثاني')+' يبدو أقصر من النموذج؛ راجع موضعًا ناقص النبض قبل النهاية.')}
 if(issues.length)return {ok:false,html:'<b>يوجد خلل إيقاعي محتمل:</b><br>'+issues.join('<br>')+'<br><br><span class="muted">لا أعطيك الصياغة الصحيحة. غيّر عبارتك أنت مع الحفاظ على المعنى والصورة ثم أعد الفحص.</span>',issues:issues};
 return {ok:true,html:'<b>لا يظهر فرق كبير في طول النبض المكتوب مقارنة بالنموذج.</b><br>هذا لا يثبت سلامة الوزن نهائيًا؛ اقرأ بيتك بصوت مرتفع على نغمة البيت الأصلي. إذا تعثرت أذنك فعدّل العبارة قبل النظر إلى التفعيلات.'}
}
function daysSince(ts){return Math.floor((Date.now()-ts)/86400000)}
function nextIncomplete(from){for(var k=1;k<=lessons.length;k++){var i=(from+k)%lessons.length;if(!st.completed[lessons[i].id])return i}return (from+1)%lessons.length}

function renderLesson(){
 var L=lessons[viewIndex],c=L.classical,f=L.folk;
 $('#lessonLabel').textContent='الدرس '+arNum(viewIndex+1)+' من '+arNum(lessons.length);
 $('#lessonProgress').textContent=arNum(Object.keys(st.completed).length)+' / '+arNum(lessons.length)+' مكتملة';
 $('#themeCard').innerHTML='<div><strong>محور اليوم: '+esc(L.theme)+'</strong><div class="muted">'+esc(L.focus)+'</div></div><span>'+(st.completed[L.id]?'✓ مكتمل':'قيد التدريب')+'</span>';
 $('#cPoet').textContent=c.poet;$('#cPoem').textContent=c.poem;$('#cMeter').textContent=c.meter;$('#cVerse').innerHTML='<span class="half">'+esc(c.a)+'</span><span class="half">'+esc(c.b)+'</span>';$('#cSource').href=c.source;$('#cMeaning').textContent=c.meaning;$('#cImage').textContent=c.image;$('#cRhetoric').textContent=c.rhetoric;$('#cCraft').textContent=c.craft;$('#cMeterHint').textContent=c.meter+' — احفظ النغمة أولًا ولا تبدأ بتقسيم كلماتك إلى تفعيلات.';
 $('#fPoet').textContent=f.poet;$('#fPoem').textContent=f.poem;$('#fMeter').textContent=f.meter;$('#fVerse').innerHTML='<span class="half">'+esc(f.a)+'</span><span class="half">'+esc(f.b)+'</span>';$('#fSource').href=f.source;$('#fMeaning').textContent=f.meaning;$('#fImage').textContent=f.image;$('#fRhetoric').textContent=f.rhetoric;$('#fCraft').textContent=f.craft;$('#fMeterHint').textContent=f.meter+' — في الشعبي اكتب كما تنطق وقارن بالنموذج المسموع في أذنك.';
 $('#cTarget').textContent=c.meter;$('#fTarget').textContent=f.meter;
 $('#recallC').value='';$('#recallF').value='';$('#recallCResult').textContent='';$('#recallFResult').textContent='';
 $('#tryC').value='';$('#tryF').value='';['#feedbackC','#feedbackF','#patternC','#patternF','#correctedC','#correctedF','#showPatternC','#showPatternF'].forEach(function(s){$(s).classList.add('hide')});
 $('#cVerse').classList.remove('hiddenVerse');$('#fVerse').classList.remove('hiddenVerse');$('#toggleVerses').textContent='إخفاء البيتين';
 st.checks={c:false,f:false};st.revision={c:false,f:false};st.recall={c:0,f:0};
 renderDots();
}
function renderDots(){$('#lessonDots').innerHTML=lessons.map(function(L,i){return '<button aria-label="الدرس '+(i+1)+'" data-dot="'+i+'" class="'+(i===viewIndex?'on':'')+'"></button>'}).join('');$$('[data-dot]').forEach(function(b){b.onclick=function(){viewIndex=+b.dataset.dot;renderLesson()}})}

function checkRecall(){
 var L=lessons[viewIndex],sc=lcsScore(fullVerse(L.classical),$('#recallC').value),sf=lcsScore(fullVerse(L.folk),$('#recallF').value);st.recall={c:sc,f:sf};
 function show(el,s){el.textContent=s>=90?'ممتاز — استرجاع شبه كامل.':s>=70?'جيد — بقيت فروق قليلة؛ أعد البيت بصوتك مرة أخرى.':'الحفظ غير كافٍ بعد. راجع البيت ثم أخفه وحاول مجددًا.';el.className='micro '+(s>=70?'ok':'bad')}
 show($('#recallCResult'),sc);show($('#recallFResult'),sf)
}
function recordErrors(kind,res){
 if(res.ok||res.needsSplit)return;
 var key=kind==='c'?'فصيح':'شعبي';
 res.issues.forEach(function(x){st.errors.push({date:Date.now(),lesson:lessons[viewIndex].id,kind:key,issue:x.indexOf('أطول')>-1?'زيادة إيقاعية':'نقص إيقاعي'})});if(st.errors.length>80)st.errors=st.errors.slice(-80);save();renderMirror()
}
function checkAttempt(kind,revised){
 var L=lessons[viewIndex],ref=kind==='c'?L.classical:L.folk,txt=$(kind==='c'?'#tryC':'#tryF').value.trim(),fb=$(kind==='c'?'#feedbackC':'#feedbackF');
 if(!txt)return alert('اكتب بيتك أولًا.');
 var res=rhythmResult(txt,ref);fb.innerHTML=res.html;fb.className='feedback '+(res.ok?'ok':'warn');fb.classList.remove('hide');st.checks[kind]=true;
 if(!res.ok&&!res.needsSplit&&!revised){st.revision[kind]=false;$(kind==='c'?'#correctedC':'#correctedF').classList.remove('hide');recordErrors(kind,res)}
 if(revised){st.revision[kind]=true;$(kind==='c'?'#showPatternC':'#showPatternF').classList.remove('hide');if(!res.ok&&!res.needsSplit)recordErrors(kind,res)}
 if(res.ok){st.revision[kind]=true;$(kind==='c'?'#showPatternC':'#showPatternF').classList.remove('hide')}
}
function showPattern(kind){
 var L=lessons[viewIndex],r=kind==='c'?L.classical:L.folk,box=$(kind==='c'?'#patternC':'#patternF');
 box.innerHTML='<b>'+esc(r.meter)+'</b><br>'+esc(r.pattern)+'<br><span class="muted">قارن الآن فقط بعد محاولتك وتصحيحك. لا تعُد إلى تركيب الكلمات ميكانيكيًا على التفعيلة.</span>';box.classList.remove('hide')
}
function finishLesson(){
 var L=lessons[viewIndex],problems=[];
 if(st.recall.c<70||st.recall.f<70)problems.push('تحقق من حفظ البيتين بدرجة ٧٠٪ على الأقل');
 if(!$('#tryC').value.trim()||!$('#tryF').value.trim())problems.push('اكتب بيت محاكاة فصيحًا وبيتًا شعبيًا');
 if(!st.checks.c||!st.checks.f)problems.push('افحص محاولتي الوزن');
 if(!st.revision.c||!st.revision.f)problems.push('إذا ظهر خلل فصحح البيت وأعد الفحص');
 if(problems.length)return alert('قبل إنهاء الدرس:\n• '+problems.join('\n• '));
 if(!st.completed[L.id]){st.completed[L.id]=Date.now();st.reviews[L.id]={level:0,last:Date.now()};}
 st.current=nextIncomplete(viewIndex);save();alert('أُنجز الدرس. سيعود إليك في المراجعة المتباعدة.');viewIndex=st.current;renderLesson();renderReview();renderMirror()
}

function reviewDue(){
 var out=[];Object.keys(st.completed).forEach(function(id){var L=lessons.find(function(x){return x.id===id}),r=st.reviews[id]||{level:0,last:st.completed[id]};if(!L)return;var level=Math.min(r.level,reviewIntervals.length-1),need=reviewIntervals[level],elapsed=daysSince(r.last);if(elapsed>=need)out.push({L:L,need:need,elapsed:elapsed})});return out
}
function renderReview(){
 var due=reviewDue(),done=Object.keys(st.completed).length;
 $('#reviewSummary').innerHTML='<div><b>'+arNum(done)+'</b><span>دروس مكتملة</span></div><div><b>'+arNum(due.length)+'</b><span>مراجعات مستحقة</span></div><div><b>'+arNum(st.errors.length)+'</b><span>ملاحظات إيقاعية</span></div>';
 if(!due.length){$('#reviewDue').innerHTML='<div class="feedback">لا توجد مراجعة مستحقة الآن. يمكنك إجراء اختبار عشوائي من الأسفل.</div>';return}
 $('#reviewDue').innerHTML=due.map(function(x){return '<article class="reviewCard" data-review="'+x.L.id+'"><span class="eyebrow">مستحقة بعد '+arNum(x.need)+' يوم</span><h3>'+esc(x.L.theme)+'</h3><p>'+esc(x.L.classical.poet)+' + '+esc(x.L.folk.poet)+'</p><button class="primary" data-start-review="'+x.L.id+'">ابدأ اختبار الحفظ</button><div class="reviewTest hide"></div></article>'}).join('');
 $$('[data-start-review]').forEach(function(b){b.onclick=function(){startReview(b.dataset.startReview,b.closest('.reviewCard').querySelector('.reviewTest'))}})
}
function startReview(id,box){
 var L=lessons.find(function(x){return x.id===id});if(!L)return;
 box.innerHTML='<p>اكتب البيتين من الذاكرة دون فتح درس اليوم.</p><label>الفصيح<textarea data-r-c></textarea></label><label>الشعبي<textarea data-r-f></textarea></label><button class="secondary" data-check-review>تحقق</button><div class="feedback hide" data-r-fb></div>';box.classList.remove('hide');
 box.querySelector('[data-check-review]').onclick=function(){var a=lcsScore(fullVerse(L.classical),box.querySelector('[data-r-c]').value),f=lcsScore(fullVerse(L.folk),box.querySelector('[data-r-f]').value),fb=box.querySelector('[data-r-fb]');fb.classList.remove('hide');fb.innerHTML='الفصيح: '+arNum(a)+'٪ · الشعبي: '+arNum(f)+'٪';if(a>=70&&f>=70){var r=st.reviews[id]||{level:0,last:Date.now()};r.level=Math.min(reviewIntervals.length,r.level+1);r.last=Date.now();st.reviews[id]=r;save();fb.innerHTML+='<br><b>تمت المراجعة بنجاح.</b>';setTimeout(renderReview,700)}else fb.innerHTML+='<br>أعد القراءة ثم جرّب مرة أخرى.'}
}
function randomReview(){
 var ids=Object.keys(st.completed),L=ids.length?lessons.find(function(x){return x.id===ids[Math.floor(Math.random()*ids.length)]}):lessons[viewIndex],box=$('#randomReviewBox');
 box.innerHTML='<div class="prompt"><b>'+esc(L.classical.poet)+':</b> '+esc(L.classical.a)+' … أكمل العجز من الذاكرة.</div><textarea id="randomAnswer"></textarea><button id="randomCheck" class="primary">تحقق</button><div id="randomFb" class="micro"></div>';box.classList.remove('hide');$('#randomCheck').onclick=function(){var s=lcsScore(L.classical.b,$('#randomAnswer').value);$('#randomFb').textContent='مطابقة تقريبية: '+arNum(s)+'٪ — الهدف الاسترجاع لا النسخ الحرفي فقط.'}
}

function allMeters(kind){return meterLibrary[kind]}
function fillFreeMeters(){var k=$('#freeKind').value;$('#freeMeter').innerHTML=allMeters(k).map(function(m){return '<option>'+esc(m.n)+'</option>'}).join('')}
function findReference(kind,meter){for(var i=0;i<lessons.length;i++){var r=kind==='classical'?lessons[i].classical:lessons[i].folk;if(r.meter.indexOf(meter)>-1||meter.indexOf(r.meter)>-1)return r}return null}
function freeCheck(){
 var idea=$('#freeIdea').value.trim(),img=$('#freeImage').value.trim(),txt=$('#freeVerse').value.trim(),kind=$('#freeKind').value,m=$('#freeMeter').value,fb=$('#freeFeedback'),notes=[];
 if(!idea)notes.push('لم تحدد الفكرة بعد؛ هذا يعيدك إلى تركيب الكلمات.');
 if(!img)notes.push('لم تصنع صورة قبل الوزن؛ حاول جعل المعنى يُرى أو يُسمع.');
 if(!txt)notes.push('لم تكتب البيت بعد.');
 if(txt){var ref=findReference(kind,m);if(ref){var r=rhythmResult(txt,ref);notes.push((r.ok?'الإيقاع الأولي: لا يظهر فرق كبير عن نموذج محفوظ.':'الإيقاع الأولي: '+r.html.replace(/<[^>]+>/g,' ')))}else notes.push('لا يوجد في دروسك الحالية نموذج محفوظ على هذا الوزن؛ استخدم مكتبة الأوزان والسماع ولا تعتمد على الفحص الشكلي.')}
 notes.push('اسأل نفسك: هل القافية أجبرتني على كلمة ضعيفة؟ وهل الصورة تضيف معنى أم مجرد زينة؟');
 fb.innerHTML=notes.map(function(x){return '• '+x}).join('<br>');fb.classList.remove('hide')
}
function saveDraft(){
 var t=$('#freeVerse').value.trim();if(!t)return alert('اكتب البيت أولًا.');
 st.drafts.push({date:Date.now(),idea:$('#freeIdea').value.trim(),image:$('#freeImage').value.trim(),kind:$('#freeKind').value,meter:$('#freeMeter').value,text:t});save();renderDrafts();alert('حُفظت المسودة على هذا الجهاز.')
}
function renderDrafts(){
 if(!st.drafts.length){$('#drafts').innerHTML='<div class="feedback">لا توجد مسودات بعد.</div>';return}
 $('#drafts').innerHTML=st.drafts.slice().reverse().map(function(x,ri){var i=st.drafts.length-1-ri;return '<article class="draftCard"><small>'+esc(x.kind==='classical'?'فصيح':'شعبي')+' · '+esc(x.meter)+'</small><p>'+esc(x.text)+'</p><div class="cardActions"><button data-copy-d="'+i+'">نسخ</button><button class="danger" data-del-d="'+i+'">حذف</button></div></article>'}).join('');
 $$('[data-copy-d]').forEach(function(b){b.onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(st.drafts[+b.dataset.copyD].text)}});$$('[data-del-d]').forEach(function(b){b.onclick=function(){st.drafts.splice(+b.dataset.delD,1);save();renderDrafts()}})
}
function renderMirror(){
 var counts={};st.errors.forEach(function(e){var k=e.kind+' · '+e.issue;counts[k]=(counts[k]||0)+1});var keys=Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]});
 $('#errorMirror').innerHTML=keys.length?keys.slice(0,6).map(function(k){return '<div class="mirrorCard"><b>'+esc(k)+'</b><span>تكرر '+arNum(counts[k])+' مرة</span></div>'}).join(''):'<div class="feedback">لم تتكوّن لديك أنماط أخطاء بعد. ستظهر هنا بعد فحص محاولاتك.</div>'
}
function renderMeters(){
 var a=meterLibrary[st.meterTab];$$('[data-meter-tab]').forEach(function(b){b.classList.toggle('on',b.dataset.meterTab===st.meterTab)});
 $('#meterLibrary').innerHTML=a.map(function(m){return '<article class="meterCard"><h3>'+esc(m.n)+'</h3><div class="meterPattern">'+esc(m.p)+'</div><p>'+esc(m.d)+'</p></article>'}).join('')
}
function navigate(id){$$('.page').forEach(function(p){p.classList.toggle('on',p.id===id)});$$('.nav button').forEach(function(b){b.classList.toggle('on',b.dataset.page===id)});if(id==='review')renderReview();if(id==='write'){renderDrafts();renderMirror();fillFreeMeters()}if(id==='meters')renderMeters();scrollTo({top:0,behavior:'smooth'})}
function bind(){
 $$('.nav button').forEach(function(b){b.onclick=function(){navigate(b.dataset.page)}});
 $('#prevLesson').onclick=function(){viewIndex=(viewIndex-1+lessons.length)%lessons.length;renderLesson()};$('#nextLesson').onclick=function(){viewIndex=(viewIndex+1)%lessons.length;renderLesson()};
 $('#toggleVerses').onclick=function(){var hide=!$('#cVerse').classList.contains('hiddenVerse');$('#cVerse').classList.toggle('hiddenVerse',hide);$('#fVerse').classList.toggle('hiddenVerse',hide);this.textContent=hide?'إظهار البيتين':'إخفاء البيتين'};
 $('#checkRecall').onclick=checkRecall;
 $('#checkC').onclick=function(){checkAttempt('c',false)};$('#checkF').onclick=function(){checkAttempt('f',false)};
 $('#correctedC').onclick=function(){checkAttempt('c',true)};$('#correctedF').onclick=function(){checkAttempt('f',true)};
 $('#showPatternC').onclick=function(){showPattern('c')};$('#showPatternF').onclick=function(){showPattern('f')};
 $('#finishLesson').onclick=finishLesson;
 $('#randomReview').onclick=randomReview;
 $('#freeKind').onchange=fillFreeMeters;$('#freeCheck').onclick=freeCheck;$('#saveDraft').onclick=saveDraft;
 $$('[data-meter-tab]').forEach(function(b){b.onclick=function(){st.meterTab=b.dataset.meterTab;renderMeters()}})
}
function pwa(){if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(function(){});window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;$('#install').classList.remove('hide')});$('#install').onclick=async function(){if(!deferred)return;deferred.prompt();await deferred.userChoice;deferred=null;$('#install').classList.add('hide')}}
viewIndex=Math.max(0,Math.min(lessons.length-1,st.current));renderLesson();renderReview();fillFreeMeters();renderDrafts();renderMirror();renderMeters();bind();pwa();
})();
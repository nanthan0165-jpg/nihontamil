async function translate(text) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  const data = await res.json();
  const translated = data[0].map(item => item[0]).join('');
  return translated;
}
translate("This is a book. It is very good. I like reading it.").then(console.log);

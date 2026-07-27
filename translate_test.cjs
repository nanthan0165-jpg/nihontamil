async function translate(text) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ta`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.responseData.translatedText);
  } catch(e) {
    console.error(e);
  }
}
translate("This is a book.").then(() => process.exit(0));

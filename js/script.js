const countries = {
  "Ja-Jp": "Japanese",
  "kk-kz": "kazakh",
  "ko-KR": "Korean",
  "Kn-IN": "Kurdish",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "men-SL": "Mende",
  "ms-MY": "Malaya",
  "mt-MT": "Maltese",
  "en-GB": "English",
  "hi-IN": "Hindi"
};

const fromText = document.querySelector(".from-text")
const toText = document.querySelector(".to-text")
const selectTag = document.querySelectorAll("select");
const exchangeIcon= document.querySelector(".exchange");
translateBtn = document.querySelector("button");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
      // Selecting English by default as From language and Hindi as to language
      let selected;
      if (id == 0 && country_code == "en-GB") {
          selected = "selected";
      } else if (id == 1 && country_code == "hi-GB") {
          selected = "selected";
      }
      let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option); // Adding option tag inside select tag
  }
});

exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
  tempLang = selectTag[0].value;
  fromText.value = toText.value;
  toText.value = tempText;
})

translateBtn.addEventListener("click", () =>{
  let text = fromText.value,
  translateFrom = selectTag[0].value,  // getting fromSelect tag value
  translateTo = selectTag[1].value;      // getting toSelect tag value
  console.log(text, translateFrom, translateTo);
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  // fetching api response and returning it with parsing into js obj
  // and in another then method recieve that obj
  fetch(apiUrl).then(res => res.json()).then(data => {
    console.log(data);
    toText.value = data.responseData.translatedText
  })
});
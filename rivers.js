var rivers = ["ЧЕРТАНОВКА", "ГОРОДНЯ", "ДУБИНКИНСКАЯ", "БИТЦА", "ПАХРА"];
var fields = Array(rivers.length);

for (var i = 0; i < fields.length; i++) {
  fields[i]           = document.getElementById("field_" + i);
  fields[i].value     = hideLetters(rivers[i]);
  fields[i].onpaste   = suppress;
  fields[i].onkeydown = suppress;
  fields[i].onkeyup   = handler(i);
}

function handler(i) {
  var field = fields[i];
  var river = rivers[i];

  return function(event) {
    for (var i = 0; i < river.length; i++) {
      if (river[i] == event.key.toUpperCase()) {
        field.value = replaceAt(field.value, river[i], i);
      }
    }

    event.preventDefault();
  };
}

function suppress(event) {
  event.preventDefault();
}

function hideLetters(word) {
  return word[0] + "*".repeat(word.length - 2) + word[word.length - 1];
}

function replaceAt(str, chr, idx) {
  return str.substring(0, idx) + chr + str.substring(idx + 1);
}

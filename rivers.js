var rivers = ["ЧЕРТАНОВКА", "ГОРОДНЯ", "ДУБИНКИНСКАЯ", "БИТЦА", "ПАХРА"];
var fields = Array(rivers.length);
var values = Array(rivers.length);

for (var i = 0; i < fields.length; i++) {
  values[i]         = hideLetters(rivers[i]);
  fields[i]         = document.getElementById("field_" + i);
  fields[i].value   = values[i];
  fields[i].oninput = handler(i);
}

function handler(x) {
  return function(event) {
    if (event.data) {
      var input = event.data.toUpperCase();
      for (var i = 0; i < rivers[x].length; i++) {
        for (var j = 0; j < input.length; j++) {
          if (rivers[x][i] == input[j]) {
            fields[x].value = replaceAt(values[x], rivers[x][i], i);
            values[x]       = fields[x].value;
          } else fields[x].value = values[x];
        }
      }
    } else fields[x].value = values[x];
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

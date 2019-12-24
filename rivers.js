var rivers = ["ЧЕРТАНОВКА", "ГОРОДНЯ", "ДУБИНКИНСКАЯ", "БИТЦА", "ПАХРА"];
var fields = Array(rivers.length);

for (var i = 0; i < fields.length; i++) {
  fields[i]               = document.getElementById("field_" + i);
  fields[i].value         = hideLetters(rivers[i]);
  fields[i].onkeydown     = handleKeydown(i);
  fields[i].onbeforeinput = handleInput(i);
  fields[i].onpaste       = suppress;
}

function handleKeydown(i) {
  return function(event) {
    processInput(fields[i], rivers[i], event.key.toUpperCase());
    event.preventDefault();
  };
}

function handleInput(i) {
  return function(event) {
    processInput(fields[i], rivers[i], event.data.toUpperCase());
    event.preventDefault();
  };
}

function processInput(field, river, input) {
  for (var i = 0; i < river.length; i++)
    for (var j = 0; j < input.length; j++) {
      if (river[i] == input[j]) field.value = replaceAt(field.value, river[i], i);
    }
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

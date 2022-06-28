// const myForm = document.getElementById("myForm");
// const csvFile = document.getElementById("csvFile");
// let parOutput = document.getElementById("errorOutput");
// let h1Output = document.getElementById("changeHeader");
// let errorHeader = document.getElementById("errorHeader");
// let download = document.getElementById("download");
// let charLength = document.getElementById("charlengthCheck");
// let charLengthNum = document.getElementById("charlengthnum");
// let singleChar = document.getElementById("singlechar");
// let domainCheck = document.getElementById("domainCheck");
// let atCheck = document.getElementById("atCheck");
// let remDupesCheck = document.getElementById("removeDupes");
// let prefixCheck = document.getElementById("prefixCheck");
// let suffixCheck = document.getElementById("suffixCheck");
// let findreplacecheck = document.getElementById("findandreplacecheck");
//let csvString = "";
let warnCount = 0;
let badContacts = new Array();
let duplicates = new Array();
let warningsMap = new Map();
let fieldHeaders = new Array();
console.log(fieldHeaders);

function openSuccess() {
  document.getElementById("successalert").style.display = "block";
  window.setTimeout(function () {
    document.getElementById("successalert").style.opacity = 1;
    document.getElementById("successalert").style.transform = "scale(1)";
  }, 0);
  window.setTimeout(function () {
    closeSuccess();
  }, 1500);
}
function closeSuccess() {
  document.getElementById("successalert").style.opacity = 0;
  document.getElementById("successalert").style.transform = "scale(0)";
  window.setTimeout(function () {
    document.getElementById("successalert").style.display = "none";
  }, 700); // timed to match animation-duration
  //document.getElementById("successalert").style.display = "none";
}
//function that activates ignore alert
function openIgnoreAlert() {
  document.getElementById("ignorealert").style.display = "block";
  window.setTimeout(function () {
    document.getElementById("ignorealert").style.opacity = 1;
    document.getElementById("ignorealert").style.transform = "scale(1)";
  }, 0);
  window.setTimeout(function () {
    closeIgnoreAlert();
  }, 1500);
}
//function that closes ignore alert.
function closeIgnoreAlert() {
  document.getElementById("ignorealert").style.opacity = 0;
  document.getElementById("ignorealert").style.transform = "scale(0)";
  window.setTimeout(function () {
    document.getElementById("ignorealert").style.display = "none";
  }, 700); // timed to match animation-duration
  //document.getElementById("successalert").style.display = "none";
}
//this function turns the csv file to an array
function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  let headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  for (let i = 0; i < headers.length; i++) {
    headers[i] = headers[i].toLowerCase();
    headers[i] = headers[i].trim();
  }
  console.log("Headers:");
  console.log(headers);
  fieldHeaders = headers;
  //get rid of \r at end of header list
  let lastIndex = headers.length - 1;
  if (headers[lastIndex].includes("\r")) {
    headers[lastIndex] = headers[lastIndex].slice(0, -1);
    //console.log(headers[headers.length - 1]);
  }
  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  let rows = str.slice(str.indexOf("\n") + 1).split("\n");
  //get rid of \r at end of every row
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].includes("\r")) {
      rows[i] = rows[i].slice(0, -1);
    }
  }
  //console.log(rows);

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    let values = [];
    //if firstname string has a comma
    if (row.includes('"')) {
      if (row[0] === '"') {
        let subs = row.match(/"([^"]+)"/);
        //console.log(subs);
        row = row.slice(subs[0].length + 1, row.length);
        let tempValues = row.split(delimiter);
        values.push(subs[1]);
        for (let j = 0; j < tempValues.length; j++) {
          values.push(tempValues[j]);
        }
      } else {
        //if some other (lastname or email) string has a comma
        while (row.indexOf('"') > -1) {
          let value = row.slice(0, row.indexOf(","));
          row = row.slice(row.indexOf(",") + 1, row.length);
          values.push(value);
          if (row[0] === '"') {
            let subs = row.match(/"([^"]+)"/);
            //console.log(subs);
            row = row.slice(subs[0].length + 1, row.length);
            let tempValues = row.split(delimiter);
            values.push(subs[1]);
            for (let j = 0; j < tempValues.length; j++) {
              values.push(tempValues[j]);
            }
          }
        }
      }
    } else {
      values = row.split(delimiter);
    }
    //const values = row.split(delimiter);
    //console.log("Values:")
    //console.log(values);

    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  //give line numbers && blank changes array;
  for (let i = 0; i < arr.length; i++) {
    // if (headers.indexOf("prefix") > -1) {
    //     //In the array!
    // }
    // else if (prefixCheck.checked) { arr[i].prefix = ""; } //Not in the array check if check for prefix setting is on
    // if (headers.indexOf("suffix") > -1) {
    //     //In the array!
    // }
    // else if (suffixCheck.checked){ arr[i].suffix = ""; } //Not in the array check if check for suffix setting is on
    arr[i].changes = "";
    arr[i].record = i + 2;
  }
  // return the array
  console.log("Original Input:");
  console.log(arr);

  return arr;
}

//this function capitalizes the first letter of each field
function capitalize(fullArray) {
  let textToAdd = document.createTextNode("First and Last names capitalized");
  document.getElementById("changes").appendChild(textToAdd);
  document.getElementById("changes").appendChild(document.createElement("br"));
  for (let i = 0; i < fullArray.length; i++) {
    fullArray[i]["firstname"] = fullArray[i]["firstname"].toLowerCase();
    fullArray[i]["firstname"] =
      fullArray[i]["firstname"].charAt(0).toUpperCase() +
      fullArray[i]["firstname"].slice(1);
    fullArray[i]["lastname"] = fullArray[i]["lastname"].toLowerCase();
    fullArray[i]["lastname"] =
      fullArray[i]["lastname"].charAt(0).toUpperCase() +
      fullArray[i]["lastname"].slice(1);
    fullArray[i]["email"] = fullArray[i]["email"].toLowerCase();
  }
  return fullArray;
}

//I think this one speaks for itself
// function removeCommas(fullArray) {
//   for (let i = 0; i < fullArray.length; i++) {
//     //check if there are commas in name
//     if (fullArray[i]["firstname"].includes(",")) {
//       fullArray[i]["firstname"].replace(",", "");
//     }
//     if (fullArray[i]["lastname"].includes(",")) {
//       fullArray[i]["lastname"].replace(",", "");
//     }
//   }
// }

//find and replace modal functionality
let numFars = 0;
let numHeaders = 0;
// console.log(findreplacecheck);
// if (findreplacecheck.checked) {
//   let addreplacement = document.getElementById("addreplace");
//   addreplacement.addEventListener("click", function () {
//     let modalbody = document.getElementById("moreFars");
//     modalbody.innerHTML +=
//       '<div class="modalbox" id="farinputbox' +
//       numFars.toString() +
//       '"><input style="margin-right: 3px;" class="farinput" id="findinput' +
//       numFars.toString() +
//       '" type="text" placeholder="Find"><input class="farinput" id="replaceinput' +
//       numFars.toString() +
//       '" type="text" placeholder="Replace"></div>';
//     numFars++;
//   });
//   let removereplacement = document.getElementById("removereplace");
//   removereplacement.addEventListener("click", function () {
//     if (numFars !== 0) {
//       numFars--;
//       let replacementLine = document.getElementById(
//         "farinputbox" + numFars.toString()
//       );
//       replacementLine.remove();
//     }
//   });

//   let addheader = document.getElementById("addheader");
//   addheader.addEventListener("click", function () {
//     let modalbody = document.getElementById("moreheaders");
//     modalbody.innerHTML +=
//       '<div class="modalbox" id="farheader' +
//       numHeaders.toString() +
//       '"><input class="farinput" id="farheaderinput' +
//       numHeaders.toString() +
//       '" type="text" placeholder="Header" aria-label="default input example"></div>';
//     numHeaders++;
//   });
//   let removeheader = document.getElementById("removeheader");
//   removeheader.addEventListener("click", function () {
//     if (numHeaders !== 0) {
//       numHeaders--;
//       let headerLine = document.getElementById(
//         "farheader" + numHeaders.toString()
//       );
//       headerLine.parentNode.removeChild(headerLine);
//     }
//   });
// }
//function to find a value and replace it
function findandreplace(valuestofind, valuestoreplace, headers, fullArray) {
  headers.forEach((header) => {
    fullArray.forEach((contact) => {
      for (let k = 0; k < valuestofind.length; k++) {
        if (contact[header] === valuestofind[k]) {
          contact[header] = valuestoreplace[k];
        }
      }
    });
  });
}

//this function checks for suffixes
function hasSuffix(fullArray) {
  //   let regexSpecial = /^[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/g;
  let regexAlpha = /^[a-z A-Z]+$/;
  for (let i = 0; i < fullArray.length; i++) {
    //let firstname = fullArray[i]["firstname"];
    //let lastname = fullArray[i]["lastname"];
    //firstname
    if (
      !regexAlpha.test(fullArray[i]["firstname"]) &&
      !fullArray[i]["firstname"].includes("-") &&
      !fullArray[i]["firstname"].includes("'")
    ) {
      //check for suffix
      if (fullArray[i]["firstname"].includes(" jr."))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(" jr.", "");
      if (fullArray[i]["firstname"].includes(" sr."))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(" sr.", "");
      if (
        fullArray[i]["firstname"].includes(", jr") &&
        !fullArray[i]["firstname"].includes(" jr.")
      )
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", jr", "");
      if (
        fullArray[i]["firstname"].includes(", sr") &&
        !fullArray[i]["firstname"].includes(" sr.")
      )
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", sr", "");
      if (fullArray[i]["firstname"].includes(", viii"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", viii", "");
      if (fullArray[i]["firstname"].includes(", vii"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", vii", "");
      if (fullArray[i]["firstname"].includes(", vi"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", vi", "");
      if (fullArray[i]["firstname"].includes(", iv"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", iv", "");
      if (fullArray[i]["firstname"].includes(", v"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", v", "");
      if (
        fullArray[i]["firstname"].includes(", i") &&
        !fullArray[i]["firstname"].includes(", iv")
      )
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", i", "");
      if (fullArray[i]["firstname"].includes(", ii"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", ii", "");
      if (fullArray[i]["firstname"].includes(", iii"))
        addWarning("First Name has suffix", fullArray[i]);
      //fullArray[i]["firstname"] = fullArray[i]["firstname"].replace(", iii", "");
      //if firstname still has special character
      if (
        !regexAlpha.test(fullArray[i]["firstname"]) &&
        !fullArray[i]["firstname"].includes("-") &&
        !fullArray[i]["lastname"].includes("'")
      ) {
        //addWarning("First Name has special character", fullArray[i]);
      }
    }
    //lastname
    if (
      !regexAlpha.test(fullArray[i]["lastname"]) &&
      !fullArray[i]["lastname"].includes("-") &&
      !fullArray[i]["lastname"].includes("'")
    ) {
      //check for suffix
      if (fullArray[i]["lastname"].includes(" jr."))
        addWarning("Last Name has suffix", fullArray[i]);
      //fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(" jr.", "");
      if (fullArray[i]["firstname"].includes(" sr."))
        addWarning("Last Name has suffix", fullArray[i]);
      //fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(" sr.", "");
      if (
        fullArray[i]["lastname"].includes(", jr") &&
        !fullArray[i]["lastname"].includes(" jr.")
      )
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", jr", "");
      if (
        fullArray[i]["lastname"].includes(", sr") &&
        !fullArray[i]["lastname"].includes(" sr.")
      )
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", sr", "");
      if (fullArray[i]["lastname"].includes(", viii"))
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", viii", "");
      if (fullArray[i]["lastname"].includes(", vii"))
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", vii", "");
      if (fullArray[i]["lastname"].includes(", vi"))
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", vi", "");
      if (fullArray[i]["lastname"].includes(", iv"))
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", iv", "");
      if (fullArray[i]["lastname"].includes(", v"))
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", v", "");
      if (
        fullArray[i]["lastname"].includes(", i") &&
        !fullArray[i]["lastname"].includes(", iv")
      )
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", vi", "");
      if (fullArray[i]["lastname"].includes(", ii"))
        addWarning("Last Name has suffix", fullArray[i]);
      //fullArray[i]["lastname"] = fullArray[i]["lastname/"].replace(", vii", "");
      if (fullArray[i]["lastname"].includes(", iii"))
        addWarning("Last Name has suffix", fullArray[i]);
      // fullArray[i]["lastname"] = fullArray[i]["lastname"].replace(", viii", "");
      //if firstname still has special character
      if (
        !regexAlpha.test(fullArray[i]["lastname"]) &&
        !fullArray[i]["lastname"].includes("-") &&
        !fullArray[i]["lastname"].includes("'")
      ) {
        //addWarning("Last Name has special character", fullArray[i]);
      }
    }
  }
}

//checks if object is in array
function containsObject(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].record === obj.record) {
      return true;
    }
  }
  return false;
}

//this function checks for prefixes
function hasPrefix(fullArray) {
  for (let i = 0; i < fullArray.length; i++) {
    if (
      fullArray[i]["firstname"].includes("Dr.") ||
      fullArray[i]["firstname"].includes("dr.") ||
      fullArray[i]["firstname"].includes("Mr.") ||
      fullArray[i]["firstname"].includes("mr.") ||
      fullArray[i]["firstname"].includes("Ms.") ||
      fullArray[i]["firstname"].includes("ms.") ||
      fullArray[i]["firstname"].includes("Pr.") ||
      fullArray[i]["firstname"].includes("pr.") ||
      fullArray[i]["firstname"].includes("Dr ") ||
      fullArray[i]["firstname"].includes("dr ") ||
      fullArray[i]["firstname"].includes("Mr ") ||
      fullArray[i]["firstname"].includes("mr ") ||
      fullArray[i]["firstname"].includes("Ms ") ||
      fullArray[i]["firstname"].includes("ms ") ||
      fullArray[i]["firstname"].includes("Pr ") ||
      fullArray[i]["firstname"].includes("pr ")
    ) {
      addWarning("Prefix found in first name", fullArray[i]);
    } else if (
      fullArray[i]["firstname"].includes("Dr. ") ||
      fullArray[i]["firstname"].includes("dr. ") ||
      fullArray[i]["firstname"].includes("Mr. ") ||
      fullArray[i]["firstname"].includes("mr. ") ||
      fullArray[i]["firstname"].includes("Ms. ") ||
      fullArray[i]["firstname"].includes("ms. ") ||
      fullArray[i]["firstname"].includes("Pr. ") ||
      fullArray[i]["firstname"].includes("pr. ") ||
      fullArray[i]["firstname"].includes("mrs.") ||
      fullArray[i]["firstname"].includes("Mrs.") ||
      fullArray[i]["firstname"].includes("Mrs ") ||
      fullArray[i]["firstname"].includes("mrs ")
    ) {
      addWarning("Prefix found in first name", fullArray[i]);
    } else if (
      fullArray[i]["firstname"].includes("Mrs. ") ||
      fullArray[i]["firstname"].includes("mrs. ")
    ) {
      addWarning("Prefix found in first name", fullArray[i]);
    }
    if (
      fullArray[i]["lastname"].includes("Dr.") ||
      fullArray[i]["lastname"].includes("dr.") ||
      fullArray[i]["lastname"].includes("Mr.") ||
      fullArray[i]["lastname"].includes("mr.") ||
      fullArray[i]["lastname"].includes("Ms.") ||
      fullArray[i]["lastname"].includes("ms.") ||
      fullArray[i]["lastname"].includes("Pr.") ||
      fullArray[i]["lastname"].includes("pr.") ||
      fullArray[i]["lastname"].includes("Dr ") ||
      fullArray[i]["lastname"].includes("dr ") ||
      fullArray[i]["lastname"].includes("Mr ") ||
      fullArray[i]["lastname"].includes("mr ") ||
      fullArray[i]["lastname"].includes("Ms ") ||
      fullArray[i]["lastname"].includes("ms ") ||
      fullArray[i]["lastname"].includes("Pr ") ||
      fullArray[i]["lastname"].includes("pr ")
    ) {
      addWarning("Prefix found in last name", fullArray[i]);
    } else if (
      fullArray[i]["lastname"].includes("Dr. ") ||
      fullArray[i]["lastname"].includes("dr. ") ||
      fullArray[i]["lastname"].includes("Mr. ") ||
      fullArray[i]["lastname"].includes("mr. ") ||
      fullArray[i]["lastname"].includes("Ms. ") ||
      fullArray[i]["lastname"].includes("ms. ") ||
      fullArray[i]["lastname"].includes("Pr. ") ||
      fullArray[i]["lastname"].includes("pr. ") ||
      fullArray[i]["lastname"].includes("mrs.") ||
      fullArray[i]["lastname"].includes("Mrs.") ||
      fullArray[i]["lastname"].includes("Mrs ") ||
      fullArray[i]["lastname"].includes("mrs ")
    ) {
      addWarning("Prefix found in last name", fullArray[i]);
    } else if (
      fullArray[i]["lastname"].includes("Mrs. ") ||
      fullArray[i]["lastname"].includes("mrs. ")
    ) {
      addWarning("Prefix found in first name", fullArray[i]);
    }
  }
}

//this function counts the characters in firstname and lastname of each row and gives a warning if over 20 char
function charCount(fullArray) {
  let charLengthNum = document.getElementById("charlengthnum");
  for (let i = 0; i < fullArray.length; i++) {
    //if first or last names are over charLengthNum characters
    if (
      fullArray[i]["firstname"].length > charLengthNum.value &&
      fullArray[i]["lastname"].length > charLengthNum.value
    ) {
      //First Name
      addWarning(
        "First name over " + charLengthNum.value + " characters",
        fullArray[i]
      );
      //Last Name
      addWarning(
        "Last name over " + charLengthNum.value + " characters",
        fullArray[i]
      );
    } else if (fullArray[i]["firstname"].length > charLengthNum.value) {
      addWarning(
        "First name over " + charLengthNum.value + " characters",
        fullArray[i]
      );
    } else if (fullArray[i]["lastname"].length > charLengthNum.value) {
      addWarning(
        "Last name over " + charLengthNum.value + " characters",
        fullArray[i]
      );
    }
  }
}

//if first or last names are just one character
function singleCharCount(fullArray) {
  for (let i = 0; i < fullArray.length; i++) {
    if (
      fullArray[i]["firstname"].length === 1 &&
      fullArray[i]["lastname"].length === 1 &&
      fullArray[i]["firstname"] !== "�" &&
      fullArray[i]["lastname"] !== "�"
    ) {
      //First Name
      addWarning("First Name is a single character", fullArray[i]);
      //Last Name
      addWarning("Last Name is a single character", fullArray[i]);
    } else if (
      fullArray[i]["firstname"].length === 1 &&
      fullArray[i]["firstname"] !== "�"
    ) {
      addWarning("First Name is a single character", fullArray[i]);
    } else if (
      fullArray[i]["lastname"].length === 1 &&
      fullArray[i]["lastname"] !== "�"
    ) {
      addWarning("Last Name is a single character", fullArray[i]);
    } //last else ifs are for letters with a period after. Example: A.
    else if (
      fullArray[i]["firstname"].length === 2 &&
      fullArray[i]["firstname"].match(/[a-z A-Z]/) &&
      fullArray[i]["firstname"].indexOf(".") === 1 &&
      fullArray[i]["lastname"].length === 2 &&
      fullArray[i]["lastname"].match(/[a-z A-Z]/) &&
      fullArray[i]["lastname"].indexOf(".") === 1
    ) {
      //First Name
      addWarning("First Name is a single character", fullArray[i]);
      //Last Name
      addWarning("Last Name is a single character", fullArray[i]);
    } else if (
      fullArray[i]["firstname"].length === 2 &&
      fullArray[i]["firstname"].match(/[a-z A-Z]/) &&
      fullArray[i]["firstname"].indexOf(".") === 1
    ) {
      addWarning("First Name is a single character", fullArray[i]);
    } else if (
      fullArray[i]["lastname"].length === 2 &&
      fullArray[i]["lastname"].match(/[a-z A-Z]/) &&
      fullArray[i]["lastname"].indexOf(".") === 1
    ) {
      addWarning("Last Name is a single character", fullArray[i]);
    }
  }
}

//this function checks to see if there is an @ symbol in the email on each row
function emailCheckAt(fullArray) {
  for (let i = 0; i < fullArray.length; i++) {
    //console.log(fullArray[i]["email\r"]);
    let text = fullArray[i]["email"].toLowerCase();
    if (!text.includes("@")) {
      addWarning("No @ symbol in email", fullArray[i]);
    }
  }
}
//function checks for valid email domains
function emailDomain(fullArray) {
  for (let i = 0; i < fullArray.length; i++) {
    let text = fullArray[i]["email"].toLowerCase();
    //this part is not complete
    if (
      text.substr(text.length - 5).includes(".com") ||
      text.substr(text.length - 5).includes(".org") ||
      text.substr(text.length - 5).includes(".gov") ||
      text.substr(text.length - 5).includes(".net") ||
      text.substr(text.length - 5).includes(".edu") ||
      text.substr(text.length - 5).includes(".mil") ||
      text.substr(text.length - 5).includes(".cc") ||
      text.substr(text.length - 5).includes(".biz") ||
      text.substr(text.length - 5).includes(".md") ||
      text.substr(text.length - 6).includes(".info") ||
      text.substr(text.length - 6).includes(".care") ||
      text.substr(text.length - 5).includes(".ws") ||
      text.substr(text.length - 7).includes(".health") ||
      text.substr(text.length - 5).includes(".us")
    ) {
      console.log("No Invalid Emails");
    } else {
      addWarning("Invalid email domain", fullArray[i]);
    }
  }
}

//this function creates a warning and adds it to the warnings array and adds the contact to badContacts arrayOutput
function addWarning(warningText, badContact) {
  warnCount += 1;
  let a = badContact;
  let b = new Object();
  Object.assign(b, a);
  let warning = {
    warning: warningText,
    record: b.record,
    warnNumber: warnCount,
    contact: b,
  };
  if (!containsObject(b, badContacts)) {
    b.warnings = "";
    b.warnings += warningText;
    badContacts.push(b);
  } else {
    for (let i = 0; i < badContacts.length; i++) {
      if (badContacts[i].record === b.record) {
        badContacts[i].warnings += " : " + warningText;
      }
    }
  }
  if (!warningsMap.has(b.record)) {
    warningsMap.set(b.record, [warning]);
  } else {
    warningsMap.get(b.record).push(warning);
  }
}

//this function gets rid of any leading or following spaces
function spaceRemoval(fullArray) {
  //this needs to be edited
  let newArray = fullArray;
  for (let i = 0; i < fullArray.length; i++) {
    newArray[i]["firstname"] = newArray[i]["firstname"].trim();
    newArray[i]["lastname"] = newArray[i]["lastname"].trim();
    newArray[i]["email"] = newArray[i]["email"].trim();
  }
  let textToAdd = document.createTextNode("Whitespace Removed");
  document.getElementById("changes").appendChild(textToAdd);
  document.getElementById("changes").appendChild(document.createElement("br"));
  return newArray;
}

//function to remove duplicates from an array returns array and dupes
function dedupe(a) {
  let isDeduped = false;
  let numDupes = 0;
  let seen = [];
  let out = [];
  //   let j = 0;
  for (let i = 0; i < a.length; i++) {
    let item = a[i]["email"];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out.push(a[i]);
    } else {
      isDeduped = true;
      numDupes++;
      duplicates.push(a[i]);
    }
  }
  if (isDeduped === true) {
    let changeDisplay = document.getElementById("changes");
    let textToAdd = document.createTextNode(
      numDupes.toString() + " Duplicate Emails Removed"
    );
    changeDisplay.appendChild(textToAdd);

    //download Duplicates if option is checked
    let remDupesCheck = document.getElementById("removeDupes");
    if (remDupesCheck.checked) {
      let btnDupes = document.createElement("button");
      btnDupes.id = "dupeList";
      btnDupes.onclick = function () {
        downloadCSVFile(duplicates, "Duplicate Contacts");
      };
      btnDupes.innerHTML = "<span>Download Duplicates</span>";
      changeDisplay.appendChild(btnDupes);
    }

    document
      .getElementById("changes")
      .appendChild(document.createElement("br"));
  } else {
    let textToAdd = document.createTextNode("No Duplicate Emails Found");
    document.getElementById("changes").appendChild(textToAdd);
    document
      .getElementById("changes")
      .appendChild(document.createElement("br"));
  }
  //console.log(out);
  //create array to be outputted
  return out;
}

//this function creates a csv string to be able to export the new Audience
function toCSV(
  fullArray,
  fileName,
  columnDelimiter = ",",
  lineDelimiter = "\n"
) {
  let result, ctr, keys;

  if (fullArray === null || !fullArray.length) {
    return null;
  }

  keys = Object.keys(fullArray[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  fullArray.forEach((item) => {
    ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result +=
        typeof item[key] === "string" && item[key].includes(columnDelimiter)
          ? `"${item[key]}"`
          : item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

//this function allows you to download the new CSV file
function downloadCSVFile(array, fileName) {
  // Create CSV file object and feed our
  // csv_data into it
  let csvText = toCSV(array, fileName);
  let CSVFile = new Blob([csvText], { type: "text/csv" });

  // Create to temporary link to initiate
  // download process
  var temp_link = document.createElement("a");

  // Download csv file
  temp_link.download = fileName + ".csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;

  // This link should not be displayed
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);

  // Automatically click the link to trigger download
  temp_link.click();
  document.body.removeChild(temp_link);
}






/* eslint-disable */
//this activates when the submit button is pressed
export const submitted = (e, file, setShow) => {
  e.preventDefault();
  const input = file;
  const reader = new FileReader();
  reader.onload = function (e) {
    debugger; // eslint-disable-line no-debugger
    //display the warningsbox
    document.getElementById("outputbox").style.display = "block";
    document.getElementById("uploadBoxid").style.display = "none";
    document.getElementById("settingsboxid").style.display = "none";
    const text = e.target.result;
    console.log(text);
    const data = csvToArray(text);
    let cleanArray = JSON.parse(JSON.stringify(data));
    //removeCommas(cleanArray);
    //outputting changes and warnings/errors
    // let changes = document.createTextNode("Clean-up");
    let h1Output = document.getElementById("changeHeader");
    h1Output.innerHTML = "<strong>Clean-up</strong><br>";
    let textToAdd = document.createTextNode(
      "Automated cleaning succefully made the following changes:"
    );
    document.getElementById("changes").appendChild(textToAdd);
    document
      .getElementById("changes")
      .appendChild(document.createElement("br"));
    //clean up array
    cleanArray = spaceRemoval(cleanArray);
    cleanArray = capitalize(cleanArray);
    let domainCheck = document.getElementById("domainCheck");
    let remDupesCheck = document.getElementById("removeDupes");
    let prefixCheck = document.getElementById("prefixCheck");
    let suffixCheck = document.getElementById("suffixCheck");
    let findreplacecheck = document.getElementById("findandreplacecheck");
    let atCheck = document.getElementById("atCheck");
    let errorHeader = document.getElementById("errorHeader");
    let download = document.getElementById("download");
    let charLength = document.getElementById("charlengthCheck");
    let charLengthNum = document.getElementById("charlengthnum");
    let singleChar = document.getElementById("singlechar");
    let parOutput = document.getElementById("errorOutput");
    if (domainCheck.checked) {
      emailDomain(cleanArray);
    }
    if (findreplacecheck.checked) {
      let farHeaders = new Array();
      farHeaders.push(document.getElementById("farHeader").value);
      for (let i = 0; i < numHeaders; i++) {
        farHeaders.push(document.getElementById("farheaderinput" + i).value);
      }
      let findValues = new Array();
      //   let firstfind = document.getElementById("findinput").value;
      findValues.push(document.getElementById("findinput").value);
      for (let i = 0; i < numFars; i++) {
        findValues.push(document.getElementById("findinput" + i).value);
      }
      let replaceValues = new Array();
      replaceValues.push(document.getElementById("replaceinput").value);
      for (let i = 0; i < numFars; i++) {
        replaceValues.push(document.getElementById("replaceinput" + i).value);
      }
      findandreplace(findValues, replaceValues, farHeaders, cleanArray);
    }
    if (charLength.checked && charLengthNum.value > 0) {
      charCount(cleanArray);
    }
    if (singleChar.checked) {
      singleCharCount(cleanArray);
    }
    if (prefixCheck.checked) {
      hasPrefix(cleanArray);
    }
    if (suffixCheck.checked) {
      hasSuffix(cleanArray);
    }
    if (atCheck.checked) {
      emailCheckAt(cleanArray);
    }
    //build final array without badContacts
    let finalArray = [];
    for (let i = 0; i < cleanArray.length; i++) {
      if (!containsObject(cleanArray[i], badContacts)) {
        finalArray.push(cleanArray[i]);
      }
    }
    //dedupe final clean list
    if (remDupesCheck.checked) {
      finalArray = dedupe(finalArray);
    }
    //print out warnings in a table
    let warningTable = document.createElement("table");
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");
    // let headerRow = document.createElement("tr");
    warningTable.appendChild(thead);
    warningTable.appendChild(tbody);
    // Creating and adding data to first row of the table
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.innerHTML = "Record";
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "Error";
    let heading_3 = document.createElement("th");
    heading_3.innerHTML = "Quick Edit";
    let heading_4 = document.createElement("th");
    heading_4.innerHTML = "Action";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    thead.appendChild(row_1);

    //table design
    warningTable.id = "warningtable";
    parOutput.appendChild(warningTable);
    //print out warnings
    let span1 = document.createElement("span");
    span1.innerHTML = "<strong>Warnings: </strong>";
    errorHeader.appendChild(span1);
    errorHeader.appendChild(document.createElement("br"));
    let warnExplain = document.createTextNode(
      "(Contacts with errors are removed from clean list until error is manually ignored or fixed)"
    );
    let span2 = document.createElement("span");
    span2.style.fontSize = "12px";
    span2.style.color = "#878E95";
    span2.appendChild(warnExplain);
    errorHeader.appendChild(span2);
    //iterating through warnings using Map
    if (warningsMap.size === 0) {
      let textToAdd = document.createTextNode("Your file has no errors");
      parOutput.appendChild(textToAdd);
      parOutput.appendChild(document.createElement("br"));
    } else {
      console.log("Warnings Map: ");
      warningsMap.forEach(function (value, key) {
        console.log(key + " = " + value);
        if (value.length > 1) {
          //there are multiple warnings
          //output warning to warningTable
          let row_2 = document.createElement("tr");
          row_2.id = key.toString() + "row";
          row_2.className = "tablerow";
          let row_2_data_1 = document.createElement("td");
          row_2_data_1.innerHTML = key.toString();
          let row_2_data_2 = document.createElement("td");
          let row_2_data_3 = document.createElement("td");
          let onlyEmailWarnings = true;
          for (let i = 0; i < value.length; i++) {
            if (
              !value[i].warning.includes("email") &&
              !value[i].warning.includes("Email")
            ) {
              onlyEmailWarnings = false;
            }
          }
          if (onlyEmailWarnings) {
            row_2_data_2.innerHTML = "Multiple errors detected in email";
            //print out info depending on error for quick edit
            row_2_data_3.innerHTML =
              '<strong>Email: </strong><span class="errortext"><u>' +
              value[0].contact.email +
              '</u></span> <button type="button" ' +
              'id="' +
              key.toString() +
              'warning"' +
              ' class="editbutton" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil"></i></button>';
          } else {
            row_2_data_2.innerHTML = "Multiple errors detected";
            //print out info depending on error for quick edit
            debugger; // eslint-disable-line no-debugger
            row_2_data_3.innerHTML =
              '<button type="button" ' +
              'id="' +
              key.toString() +
              'warning"' + 
              ' class="editbutton"><u>Edit<u></button>';
          }
          //ignore action
          let row_2_data_4 = document.createElement("td");
          let ignoreActionButt = document.createElement("button");
          ignoreActionButt.id = key.toString() + "ignorebutton";
          ignoreActionButt.className = "ignoreactionbutton";
          ignoreActionButt.innerHTML = "<u>Ignore</u>";
          row_2_data_4.appendChild(ignoreActionButt);
          ignoreActionButt.addEventListener("click", function () {
            //remove line
            document.getElementById(key.toString() + "row").remove();
            //add to clean list
            for (let k = 0; k < badContacts.length; k++) {
              if (value[0].contact.email === badContacts[k].email) {
                badContacts[k].changes +=
                  "Warnings Ignored : " + value[0].warning;
                finalArray.push(badContacts[k]);
                badContacts.splice(k, 1);
                for (let j = 0; j < value.length; j++) {
                  warnCount--;
                }
              }
            }
            openIgnoreAlert();
          });
          //bulk action check boxes
          // let checkbox = document.createElement("input");
          // checkbox.className = "checkboxes";
          // checkbox.id = key.toString() + "checkbox";
          // checkbox.type = "checkbox";
          // row_2_data_4.appendChild(checkbox);

          row_2.appendChild(row_2_data_1);
          row_2.appendChild(row_2_data_2);
          row_2.appendChild(row_2_data_3);
          row_2.appendChild(row_2_data_4);
          tbody.appendChild(row_2);
          //output the warning
          // let buttonBox = document.createElement('div');
          // buttonBox.id = key.toString() + "lineID";
          // buttonBox.innerHTML = "⚠️ Line " + key.toString() + ": Multiple errors found " + " <button type=\"button\" " + "id=\"" + key.toString() + "warning\"" + " class=\"editbutton\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop\"><i class=\"bi bi-pencil\"></i></button>";
          // parOutput.appendChild(buttonBox);
          debugger; // eslint-disable-line no-debugger
          let editButt = document.getElementById(key.toString() + "warning");
          editButt.addEventListener("click", function () {setShow(true)})
          //edit button functionality
          editButt.addEventListener("click", function () {
            let div = document.getElementById("modalinfo");
            let title = document.getElementById("staticBackdropLabel");
            title.innerHTML = "";
            div.innerHTML = "";
            for (let i = 0; i < value.length; i++) {
              //change title
              title.appendChild(document.createTextNode(value[i].warning));
              title.appendChild(document.createElement("br"));
            }
            let editInfo = document.createElement("span");
            editInfo.style.fontSize = "12px";
            editInfo.style.color = "#878E95";
            editInfo.appendChild(
              document.createTextNode("(Click on value to edit)")
            );
            title.appendChild(editInfo);
            //change content
            let editableFName = document.getElementById("editFName");
            editableFName.value = value[0].contact.firstname;
            let editableLName = document.getElementById("editLName");
            editableLName.value = value[0].contact.lastname;
            let editableEmail = document.getElementById("editEmail");
            editableEmail.value = value[0].contact.email;
            //save button functionality
            let saveButt = document.getElementById("savebutton");
            saveButt.addEventListener("click", function () {
              //check if any edits have been made
              let firstNameEdited = false;
              let lastNameEdited = false;
              let emailEdited = false;
              let warningFixes = 0;
              for (let i = 0; i < value.length; i++) {
                //first name
                if (
                  editableFName.value !== value[i].contact.firstname &&
                  !firstNameEdited
                ) {
                  //add to clean list
                  for (let k = 0; k < badContacts.length; k++) {
                    if (value[i].contact.email === badContacts[k].email) {
                      badContacts[k].firstname = editableFName.value;
                      badContacts[k].changes += " : " + value[i].warning;
                      warningFixes++;
                      firstNameEdited = true;
                    }
                  }
                } //last name
                else if (
                  editableLName.value !== value[i].contact.lastname &&
                  !lastNameEdited
                ) {
                  //add to clean list
                  for (let k = 0; k < badContacts.length; k++) {
                    if (value[i].contact.email === badContacts[k].email) {
                      badContacts[k].lastname = editableLName.value;
                      badContacts[k].changes += " : " + value[i].warning;
                      warningFixes++;
                      lastNameEdited = true;
                    }
                  }
                } //email
                else if (
                  editableEmail.value !== value[i].contact.email &&
                  !emailEdited
                ) {
                  //add to clean list
                  for (let k = 0; k < badContacts.length; k++) {
                    if (value[i].contact.email === badContacts[k].email) {
                      badContacts[k].email = editableEmail.value;
                      badContacts[k].changes += " : " + value[i].warning;
                      warningFixes++;
                      emailEdited = true;
                    }
                  }
                }
              }
              //add edited contact to clean list
              for (let k = 0; k < badContacts.length; k++) {
                if (value[0].contact.email === badContacts[k].email) {
                  finalArray.push(badContacts[k]);
                  badContacts.splice(k, 1);
                  warnCount -= warningFixes;
                }
              }
              //remove line
              document.getElementById(key.toString() + "row").remove();
              //report successful
              openSuccess();
            });
            //ignore button functionality
            let ignoreButt = document.getElementById("ignoremodalbutton");
            ignoreButt.addEventListener("click", function () {
              //remove line
              document.getElementById(key.toString() + "row").remove();
              //add to clean list
              for (let k = 0; k < badContacts.length; k++) {
                if (value[0].contact.email === badContacts[k].email) {
                  badContacts[k].email = editableEmail.value;
                  badContacts[k].changes += "Warnings Ignored";
                  finalArray.push(badContacts[k]);
                  badContacts.splice(k, 1);
                  warnCount--;
                }
              }
              openIgnoreAlert();
            });
          });
        } else {
          //if there is only one warning
          //output warning to warningTable
          let row_2 = document.createElement("tr");
          row_2.id = key.toString() + "row";
          let row_2_data_1 = document.createElement("td");
          row_2_data_1.innerHTML = key.toString();
          let row_2_data_2 = document.createElement("td");
          row_2_data_2.innerHTML = value[0].warning;
          let row_2_data_3 = document.createElement("td");
          
          //print out info depending on error for quick edit
          if (value[0].warning.includes("email")) {
            //print email accoording to warning
            row_2_data_3.innerHTML =
              '<strong>Email: </strong><span class="errortext"><u>' +
              value[0].contact.email +
              '</u></span> <button type="button" ' +
              'id="' +
              key.toString() +
              'warning"' +
              ' class="editbutton"><i class="bi bi-pencil"></i></button>';
          } else if (
            value[0].warning.includes("First") ||
            value[0].warning.includes("first")
          ) {
            //print first name accoording to warning
            row_2_data_3.innerHTML =
              '<strong>First Name: </strong><span class="errortext"><u>' +
              value[0].contact.firstname +
              '</u></span> <button type="button" ' +
              'id="' +
              key.toString() +
              'warning"' +
              ' class="editbutton" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil"></i></button>';
          } else if (
            value[0].warning.includes("Last") ||
            value[0].warning.includes("last")
          ) {
            //print last name accoording to warning
            row_2_data_3.innerHTML =
              '<strong>Last Name: </strong><span class="errortext"><u>' +
              value[0].contact.lastname +
              '</u></span> <button type="button" ' +
              'id="' +
              key.toString() +
              'warning"' +
              ' class="editbutton" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-pencil"></i></button>';
          } else {
            row_2_data_3.innerHTML = "unknown";
          }
          let row_2_data_4 = document.createElement("td");
          //ignore action
          let ignoreActionButt = document.createElement("button");
          ignoreActionButt.id = key.toString() + "ignorebutton";
          ignoreActionButt.className = "ignoreactionbutton";
          ignoreActionButt.innerHTML = "<u>Ignore</u>";
          row_2_data_4.appendChild(ignoreActionButt);
          ignoreActionButt.addEventListener("click", function () {
            //remove line
            document.getElementById(key.toString() + "row").remove();
            //add to clean list
            for (let k = 0; k < badContacts.length; k++) {
              if (value[0].contact.email === badContacts[k].email) {
                badContacts[k].changes +=
                  "Warnings Ignored : " + value[0].warning;
                finalArray.push(badContacts[k]);
                badContacts.splice(k, 1);
                for (let j = 0; j < value.length; j++) {
                  warnCount--;
                }
              }
            }
            openIgnoreAlert();
          });
          //bulk action check boxes
          // let checkbox = document.createElement("input");
          // checkbox.className = "checkboxes";
          // checkbox.id = key.toString() + "checkbox";
          // checkbox.type = "checkbox";
          // row_2_data_4.appendChild(checkbox);
          row_2.appendChild(row_2_data_1);
          row_2.appendChild(row_2_data_2);
          row_2.appendChild(row_2_data_3);
          row_2.appendChild(row_2_data_4);
          tbody.appendChild(row_2);
          //output the warning
          // let buttonBox = document.createElement('div');
          // buttonBox.innerHTML = "⚠️ Line " + key.toString() + ": " + value[0].warning + " <button type=\"button\" " + "id=\"" + key.toString() + "warning\"" + " class=\"editbutton\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop\"><i class=\"bi bi-pencil\"></i></button>";
          // buttonBox.id = key.toString() + "lineID";
          // if (value[0].warning.includes("email")) { //print email accoording to warning
          //   buttonBox.appendChild(document.createTextNode(value[0].contact.email));
          // }
          //parOutput.appendChild(buttonBox);
          let editButt = document.getElementById(key.toString() + "warning");
          editButt.addEventListener("click", function () {setShow(true)})
          // edit button functionality
          editButt.addEventListener("click", function () {
            let div = document.getElementById("modalinfo");
            //change title
            let title = document.getElementById("staticBackdropLabel");
            title.innerHTML = "";
            title.innerHTML = value[0].warning;
            title.appendChild(document.createElement("br"));
            let editInfo = document.createElement("span");
            editInfo.style.fontSize = "12px";
            editInfo.style.color = "#878E95";
            editInfo.appendChild(
              document.createTextNode("(Click on value to edit)")
            );
            title.appendChild(editInfo);
            //change content

            div.innerHTML = "";
            let editableFName = document.getElementById("editFName");
            editableFName.value = value[0].contact.firstname;
            let editableLName = document.getElementById("editLName");
            editableLName.value = value[0].contact.lastname;
            let editableEmail = document.getElementById("editEmail");
            editableEmail.value = value[0].contact.email;
            let saveButt = document.getElementById("savebutton");
            saveButt.addEventListener("click", function () {
              //first name edits
              if (editableFName.value === value[0].contact.firstname) {
                //do nothing
              } else {
                //remove line
                document.getElementById(key.toString() + "row").remove();
                //add to clean list
                for (let k = 0; k < badContacts.length; k++) {
                  if (value[0].contact.email === badContacts[k].email) {
                    badContacts[k].firstname = editableFName.value;
                    badContacts[k].changes += value[0].warning;
                    finalArray.push(badContacts[k]);
                    badContacts.splice(k, 1);
                    warnCount--;
                  }
                }
                //report successful
                openSuccess();
              }
              //last name edits
              if (editableLName.value === value[0].contact.lastname) {
                //do nothing
              } else {
                //remove line
                document.getElementById(key.toString() + "row").remove();
                //add to clean list
                for (let k = 0; k < badContacts.length; k++) {
                  if (value[0].contact.email === badContacts[k].email) {
                    badContacts[k].lastname = editableLName.value;
                    badContacts[k].changes += value[0].warning;
                    finalArray.push(badContacts[k]);
                    badContacts.splice(k, 1);
                    warnCount--;
                  }
                }
                //report successful
                openSuccess();
              }
              //email edits
              if (editableEmail.value === value[0].contact.email) {
                //do nothing
              } else {
                //remove line
                document.getElementById(key.toString() + "row").remove();
                //add to clean list
                for (let k = 0; k < badContacts.length; k++) {
                  if (value[0].contact.email === badContacts[k].email) {
                    badContacts[k].email = editableEmail.value;
                    badContacts[k].changes += value[0].warning;
                    finalArray.push(badContacts[k]);
                    badContacts.splice(k, 1);
                    warnCount--;
                  }
                }
                //report successful
                openSuccess();
              }
            });
            //ignore button functionality
            let ignoreButt = document.getElementById("ignoremodalbutton");
            ignoreButt.addEventListener("click", function () {
              //remove line
              document.getElementById(key.toString() + "row").remove();
              //add to clean list
              for (let k = 0; k < badContacts.length; k++) {
                if (value[0].contact.email === badContacts[k].email) {
                  badContacts[k].email = editableEmail.value;
                  badContacts[k].changes +=
                    "Warnings Ignored : " + value[0].warning;
                  finalArray.push(badContacts[k]);
                  badContacts.splice(k, 1);
                  warnCount--;
                }
              }
              openIgnoreAlert();
            });
          });
        }
      });
    }
    //download final clean list without bad contacts / warnings
    let btn = document.createElement("button");
    btn.id = "cleanList";
    btn.onclick = function () {
      downloadCSVFile(finalArray, "Clean Audience");
    };
    btn.innerHTML = "<span>Download Clean List</span>";
    download.appendChild(btn);
    //download bad contacts / warnings
    let btnBad = document.createElement("button");
    btnBad.id = "badList";
    btnBad.onclick = function () {
      downloadCSVFile(badContacts, "Bad Contacts");
    };
    btnBad.innerHTML = "<span>Download Error List</span>";
    download.appendChild(btnBad);
    let btnRetry = document.createElement("span");
    btnRetry.innerHTML =
      '<a href="https://audiencecleaner.theresearchcloud.com/audiencecleaner2.0/clean.html" target="_blank" id="retrybtn"><u>Submit new list</u>';
    download.appendChild(btnRetry);

    console.log("Old Audience:");
    console.log(data);
    console.log("Clean Audience:");
    console.log(cleanArray);
    console.log("Final Audience:");
    console.log(finalArray);
    console.log("Warnings Contact List:");
    console.log(badContacts);
    console.log("Duplicates:");
    console.log(duplicates);
  };
  reader.readAsText(input);
};
// let findreplacecheck = document.getElementById("findandreplacecheck");
// findreplacecheck.addEventListener('change', function () {
//     if (this.checked) {
//     document.getElementById("findreplacecontainer").style.display = "flex";
//     document.getElementById("findreplacecontainer").style.flexDirection = "column";
//   } else {
//     document.getElementById("findreplacecontainer").style.display = "none";
//   }
// });

// var myModal = document.getElementById('myModal');
// var myInput = document.getElementById('myInput');
//
// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// });

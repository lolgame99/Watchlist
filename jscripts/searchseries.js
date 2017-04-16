function searchNamesFunction() {
    // Declare variables 123
    var input, filter, table, tr, td, nav, i;
    input = document.getElementById('seriesSearchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("seriestable");
    tr = table.getElementsByTagName('tr');


    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
       td = tr[i].getElementsByTagName("td")[0];
    nav = td.getElementsByClassName("searchedEntry")[0];
       if (nav) {
         if (nav.innerHTML.toUpperCase().indexOf(filter) > -1) {
           nav.style.display = "";
         } else {
           nav.style.display = "none";
         }
       }
     }
     for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        nav = td.getElementsByClassName("searchedEntry")[0];
           if (nav) {
             if (nav.innerHTML.toUpperCase().indexOf(filter) > -1) {
               nav.style.display = "";
             } else {
               nav.style.display = "none";
             }
           }
      }
      for (i = 0; i < tr.length; i++) {
         td = tr[i].getElementsByTagName("td")[2];

         nav = td.getElementsByClassName("searchedEntry")[0];
            if (nav) {
              if (nav.innerHTML.toUpperCase().indexOf(filter) > -1) {
                nav.style.display = "";
              } else {
                nav.style.display = "none";
              }
            }
       }
}

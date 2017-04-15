function searchNamesFunction() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById('seriesSearchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById("seriestable");
    tr = table.getElementsByTagName('tr');


    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
       td = tr[i].getElementsByTagName("td")[0];

       if (td) {
         if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
           td[i].style.display = "";
         } else {
           td[i].style.display = "none";
         }
       }
     }
}
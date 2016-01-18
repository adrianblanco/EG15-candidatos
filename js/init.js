$(document).ready(function(){
  //Haha Clegg you're last. (other leader positions may not reflect the political beliefs of the author)
  var leaders  = ['Mariano%20Rajoy','Pedro%20Sanchez','Albert%20Rivera','Pablo%20Iglesias', 'Alberto%20Garzon'],
      euros    = ['euros'],
      apikey   = 'YB0MY3VMHyllzPqEf5alVj5bUvGpvDVi',
      queryURL = "http://juicer.api.bbci.co.uk/articles?api_key=" + apikey + "&recent_first=true&q=";

  function getResults(query,leader) {
    $('.container').append("<div class='" + prettyStr(leader) + "'></div>");
    $.getJSON(query, function(data) {
      var items = [];
      $.each(data.hits, function(key, val){
        // Strange. Some entries don't have titles/content. We just want the ones that do!
        if (val.title) {
          // Super-long html is icky.
          // TODO - make better somehow.
          var htmlString = [
                            "<div class='panel panel-default'><div class='panel-heading'><h3 class='panel-title'><a target='_blank' href='",
                            val.url,
                            "'>",
                            val.title,
                            "</a> (source: ",
                            val.source['source-name'],
                            ")</h3></div><div class='panel-body'>",
                            val.description,
                            "</div></div>"
                          ].join('');
          items.push(htmlString);
        }
      });
      $('.' + prettyStr(leader)).append(items.join(""));
    });
  }

  function prettyStr(str) {
    return str.replace('%20','-').toLowerCase();
  }

  for (var i = 0; i < leaders.length; i++){
    getResults(queryURL + leaders[i], leaders[i]);
  }

});

module.exports = function(connection){

  var getData = function(query, cb){
      connection.query(query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getEvents = function(cb){
    getData('SELECT events.event_id, img_url, event_name FROM events, links WHERE events.event_id = links.event_id', cb );
  };

  this.getEventById = function(data, cb){
    insertData('SELECT cover_url, event_name, startDate, endDate, venue, about, facebook, tickets, video FROM events, links WHERE events.event_id = ? AND events.event_id = links.event_id',data, cb );
  };

  this.getArtistsByEventId = function(data, cb){
    insertData('SELECT artist, artist_link, artist_img FROM artists WHERE artists.event_id = ?', data, cb);
  };
}

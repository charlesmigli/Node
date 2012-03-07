
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog', function(err) {
  if (err) { throw err; }
});

var commentaireArticleSchema = new mongoose.Schema({
  pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  contenu : String,
  date : { type : Date, default : Date.now }
});

var articleSchema = new mongoose.Schema({
  auteur : mongoose.Schema.ObjectId,
  contenu : String,
  date : { type : Date, default : Date.now },
  commentaires : [ commentaireArticleSchema ],
  votes : {
    plus : { type : Number, min : 0 },
    moins : { type : Number, min : 0 }
  }
});

var CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);

var monCommentaire = new CommentaireArticleModel({ pseudo : 'Atinux' });

monCommentaire.contenu = 'Salut, super article sur Mongoose !';
CommentaireArticleModel.find(null, function (err, comms) {
  if (err) { throw err; }
  // comms est un tableau de hash
  console.log(comms);
});

var query = CommentaireArticleModel.find(null);
query.where('pseudo', 'Atinux');
query.limit(3);
// peut s'ecrire aussi query.where('pseudo', 'Atinux').limit(3);
query.exec(function (err, comms) {
  if (err) { throw err; }
  // On va parcourir le resultat et les afficher joliment
  var comm;
  for (var i = 0, l = comms.length; i < l; i++) {
    comm = comms[i];
    console.log('------------------------------');
    console.log('Pseudo : ' + comm.pseudo);
    console.log('Commentaire : ' + comm.contenu);
    console.log('Date : ' + comm.date);
    console.log('ID : ' + comm._id);
    console.log('------------------------------');
  }
});

/*
 * monCommentaire.save(function (err) {
  if (err) { throw err; }
  console.log('Commentaire ajouté avec succès !');
    mongoose.connection.close();
});
*/

var homeController=function(server){
	server.route('/').
		get(function(req,res){
			res.render('index');
		});
}

module.exports = homeController;
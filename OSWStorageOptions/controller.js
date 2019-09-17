exports.OLSKControllerRoutes = function() {
	return [{
			OLSKRoutePath: '/stubs/OSWStorageOptions',
			OLSKRouteMethod: 'get',
			OLSKRouteFunction: function(req, res, next) {
				return res.render(req.OLSKLive.OLSKLivePathJoin(__dirname, 'stub-view'));
			},
			OLSKRouteSignature: 'OSWStorageOptionsStubRoute',
			OLSKRouteLanguages: ['en'],
			OLSKRouteIsHidden: process.env.NODE_ENV === 'production',
		}];
};

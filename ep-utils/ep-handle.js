exports.handleRequest = (req, res, controller) => {
    const method = req.method;
	const support = !!controller[method];
	support && controller[method](req, res);
	support || res.status(405).jsonp({ code: 0, message: '不支持该请求类型！' });
}
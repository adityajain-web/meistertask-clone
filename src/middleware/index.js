import { parse } from 'cookie';

const authMiddleware = (handler) => {
    return async (context) => {
        const { req, res } = context;

        const cookies = parse(req.headers.cookie || '');

        if (req.url === '/auth') {
            if (cookies['auth-token']) {
                res.writeHead(302, { Location: '/' });
                res.end();
                return { props: {} };
            }
        } else if (req.url === '/') {
            if (!cookies['auth-token']) {
                res.writeHead(302, { Location: '/auth/' });
                res.end();
                return { props: {} };
            }
        }

        if (cookies['auth-token'] && req.url === '/auth/') {
            res.writeHead(302, { Location: '/' });
            res.end();
            return { props: {} };
        }

        return await handler(context);
    };
};

export default authMiddleware;

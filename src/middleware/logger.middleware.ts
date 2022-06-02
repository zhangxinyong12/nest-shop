// 函数中间
export function Logger(req, res, next) {
  console.log('全家函数中间件');
  next();
}

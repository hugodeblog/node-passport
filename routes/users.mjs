import path from 'path';
import util from 'util';
import { default as express } from 'express';
import { default as passport } from 'passport';
import { default as passportLocal } from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import { sessionCookieName } from '../app.mjs';

export const router = express.Router();

export function initPassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}
// テスト用のユーザーを作成
var userList = [
  {id: 0, username: 'me', password: '&&&me123'},
  {id: 1, username: 'you', password: '***you123'}
];

// 該当ユーザーがいるかチェックする
function findUser(username, password) {
  for(let person of userList) {
    if(person.username === username && person.password === password) {
      return {id: person.id, 'username': person.username};
    }
  }
  return undefined;
}

// ログイン用ストラテジー
passport.use(new LocalStrategy(
  async (username, password, done) => {
    console.log(`username = ${username}, passowrd = ${password}`);
    const result = findUser(username, password);
    try {
      console.log(`result=${result}`);
      if (result != undefined) {
        done(null, { id: result.id, username: result.username});
      } else {
        done(null, false, 'Invalid username or password');
      }
    } catch (e) { done(e); }
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializeUser called');
  try {
    console.log(`serialized user=${user}`);
    done(null, user);
  } catch (e) { done(e); }
});

passport.deserializeUser(async (user, done) => {
  try {
    console.log(`deserialized user=${user}`);
    done(null, user);
  } catch(e) { done(e); }
});

// 認証ログイン画面
router.get('/login', function(req, res, next) {
  console.log('/login called');
  try {
    res.render('login', {title: 'ログイン', user: req.user ? req.user : undefined});
  } catch (e) { next(e); }
});

// ログインを試す
router.post('/login',
passport.authenticate('local', {
  successRedirect: '/', // 成功時のログイン先
  failureRedirect: 'login-failure', // 失敗時
})
);

// 認証キャッシュを削除する
router.get('/logout', function(req, res, next) {
  try {
    req.session.destroy();
    req.logout();
    res.clearCookie(sessionCookieName);
    res.redirect('login');
  } catch (e) { next(e); }
});

// ログイン失敗
router.get('/login-failure', function(req, res, next) {
  try {
    res.render('login-failure');
  } catch (e) { next(e); }
});


// サインアップページ
router.get('/signup', function(req, res, next) {
  console.log('get /signup called');
  try {
    res.render('signup', {title: 'サインアップ', user: req.user ? req.user : undefined});
  } catch (e) { next(e); }
});

// サインアップ処理
router.post('/signup', function(req, res, next) {
  try {
    var found = false;
    userList.forEach(item => {
      if(item.username == req.body.username)
      found = true;
    });
    if(found)
    res.redirect('signup-failure');
    else {
      userList.push({id: userList.length, username:req.body.username, password:req.body.password});
      console.log(userList);
      res.redirect('signup-success');
    }
  } catch (e) { next(e); }
});

// サインアップ失敗
router.get('/signup-failure', function(req, res, next) {
  try {
    res.render('signup-failure');
  } catch (e) { next(e); }
});

// サインアップ成功
router.get('/signup-success', function(req, res, next) {
  try {
    res.render('signup-success');
  } catch (e) { next(e); }
});

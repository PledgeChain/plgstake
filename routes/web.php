<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/contact', function () {
    return view('contact');
});

Route::get('/stake-pledge', function () {
    return view('stake-pledge');
});
Route::get('/splinter', function () {
    return view('splinter');
});
Route::get('/draw-out', function () {
    return view('draw-out');
});
Route::get('/dashboard', function () {
    return view('dashboard');
});
Route::get('/stake-history', function () {
    return view('stake-history');
});
Route::get('/squad', function () {
    return view('squad');
});
Route::get('/staking-two', function () {
    return view('staking-two');
});
Route::get('/farming', function () {
    return view('farming');
});
Route::get('/leaderboard', function () {
    return view('leaderboard');
});
Route::get('/apply', function () {
    return view('apply');
});
Route::get('/help-center', function () {
    return view('help-center');
});
Route::get('/wallet-connect', function () {
    return view('wallet-connect');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('/register', function () {
    return view('register');
});
Route::get('/reset', function () {
    return view('reset');
});
Route::get('/tokenomics', function () {
    return view('tokenomics');
});
Route::get('/tier-system', function () {
    return view('tier-system');
});
Route::get('/blog', function () {
    return view('blog');
});
Route::get('/blog-single', function () {
    return view('blog-single');
});





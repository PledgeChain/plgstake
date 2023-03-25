<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title  -->
    <!-- <title>@yield('title')</title> -->
    <title>Pledge - Decentralized staking of Pledge Token Yield</title>

    <!-- Favicon  -->
    <link rel="icon" href="assets/img/favicon.png">

    <!-- ***** All CSS Files ***** -->

    <!-- Style css -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel='stylesheet' href='assets/css/sweetAlert.min.css'>

</head>
 
    @if(Request::path()=='dashboard') <body class="dashboardPage"> 
    @elseif(Request::path()=='stake-history') <body class="fundHistoryPage"> 
    @elseif(Request::path()=='stake-pledge') <body class="depositPage"> 
    @elseif(Request::path()=='squad') <body class="crowdPage"> 
    @elseif(Request::path()=='splinter') <body class="riftAccountPage"> 
    @elseif(Request::path()=='/') <body class="homePage"> 
    @elseif(Request::path()=='draw-out') <body class="withdrawPage"> @endif
    <!--====== Preloader Area Start ======-->
    <div id="gameon-preloader" class="gameon-preloader">
        <!-- Preloader Animation -->
        <div class="preloader-animation">
            <!-- Spinner -->
            <div class="spinner"></div>
            <p class="fw-5 text-center text-uppercase">Loading</p>
        </div>
        <!-- Loader Animation -->
        <div class="loader-animation">
            <div class="row h-100">
                <!-- Single Loader -->
                <div class="col-3 single-loader p-0">
                    <div class="loader-bg"></div>
                </div>
                <!-- Single Loader -->
                <div class="col-3 single-loader p-0">
                    <div class="loader-bg"></div>
                </div>
                <!-- Single Loader -->
                <div class="col-3 single-loader p-0">
                    <div class="loader-bg"></div>
                </div>
                <!-- Single Loader -->
                <div class="col-3 single-loader p-0">
                    <div class="loader-bg"></div>
                </div>
            </div>
        </div>
    </div>
    <!--====== Preloader Area End ======-->

    <div class="main">
        <!-- ***** Header Start ***** -->
        <header id="header">
            <!-- Navbar -->
            <nav data-aos="zoom-out" data-aos-delay="800" class="navbar gameon-navbar navbar-expand">
                <div class="container header">

                    <!-- Logo -->
                    <a class="navbar-brand" href="{{ url('/') }}" style="color:white;"">
                        <img src="assets/img/logo/logo.png" alt="Brand Logo" /><span> PLG-STAKE</span>
                    </a>

                    <div class="ml-auto"></div>

                    <!-- Navbar Nav -->
                    <ul class="navbar-nav items mx-auto">
                        <li class="nav-item">
                            <a href="{{ url('/') }}" class="nav-link">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="dashboard" class="nav-link">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a href="stake-pledge" class="nav-link">Stake-Pledge</a>
                        </li>
                        <li class="nav-item">
                            <a href="draw-out" class="nav-link">Draw-Out</a>
                        </li>
                        <li class="nav-item">
                            <a href="splinter" class="nav-link">Splinter</a>
                        </li>
                        <li class="nav-item">
                            <a href="squad" class="nav-link">Squad</a>
                        </li>
                        <li class="nav-item">
                            <a href="stake-history" class="nav-link">Stake-History</a>
                        </li>
                    </ul>

                    <!-- Navbar Icons -->
                    

                    <!-- Navbar Toggler -->
                    <ul class="navbar-nav toggle">
                        <li class="nav-item">
                            <a href="#" class="nav-link" data-toggle="modal" data-target="#menu">
                                <i class="icon-menu m-0"></i>
                            </a>
                        </li>
                    </ul>

                    <!-- Navbar Action Button -->
                    <ul class="navbar-nav action">
                        <li class="nav-item ml-2">
                            <a href="dashboard" class="btn ml-lg-auto btn-bordered-white"><i class="icon-wallet mr-md-2"></i>Wallet Connect</a>
                        </li>
                    </ul>

                </div>
            </nav>
        </header>
        <!-- ***** Header End ***** -->

        @yield('page-data')
        <section class="cta-area p-0 mt-4">
            <div class="container">
                <div class="row">
                    <div class="col-12 card">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-12 col-md-5 text-center">
                                <img src="assets/img/content/cta_thumb.png" alt="">
                            </div>
                            <div class="col-12 col-md-6 mt-4 mt-md-0">
                                <h2 class="m-0">Purchase $PLG Now</h2>
                                <p>Get access to huge community and become a contributor to bring blockchain technology to next level.</p>
                                <a class="btn btn-bordered active d-inline-block" href="https://plgswap.live/swap" target="blank"><i class="icon-rocket mr-2"></i>Buy $PLG Now</a>
                            </div>
                        </div>
                        <!-- <a class="cta-link" href="apply"></a> -->
                    </div>
                </div>
            </div>
        </section>
        <!--====== Footer Area Start ======-->
        <footer class="footer-area">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 text-center">
                        <!-- Footer Items -->
                        <div class="footer-items">
                            <!-- Logo -->
                            <a class="navbar-brand" href="{{ url('/') }}">
                                <img src="assets/img/logo/logo.png" alt="">
                            </a>
                            <!-- Social Icons -->
                            <!--<div class="social-icons d-flex justify-content-center my-4">-->
                            <!--    <a class="facebook" href="https://www.facebook.com/" target="_blank">-->
                            <!--        <i class="icon-social-facebook"></i>-->
                            <!--        <i class="icon-social-facebook"></i>-->
                            <!--    </a>-->
                            <!--    <a class="twitter" href="https://twitter.com/" target="_blank">-->
                            <!--        <i class="icon-social-twitter"></i>-->
                            <!--        <i class="icon-social-twitter"></i>-->
                            <!--    </a>-->
                            <!--    <a class="linkedin" href="https://www.linkedin.com/" target="_blank">-->
                            <!--        <i class="icon-social-linkedin"></i>-->
                            <!--        <i class="icon-social-linkedin"></i>-->
                            <!--    </a>-->
                            <!--    <a class="reddit" href="https://www.reddit.com/" target="_blank">-->
                            <!--        <i class="icon-social-reddit"></i>-->
                            <!--        <i class="icon-social-reddit"></i>-->
                            <!--    </a>-->
                            <!--    <a class="vkontakte" href="https://discord.com/" target="_blank">-->
                            <!--        <i class="icon-social-vkontakte"></i>-->
                            <!--        <i class="icon-social-vkontakte"></i>-->
                            <!--    </a>-->
                            <!--    <a class="youtube" href="https://www.youtube.com/" target="_blank">-->
                            <!--        <i class="icon-social-youtube"></i>-->
                            <!--        <i class="icon-social-youtube"></i>-->
                            <!--    </a>-->
                            <!--</div>-->
                            <!--<ul class="list-inline">-->
                            <!--    <li class="list-inline-item"><a href="tier-system">Features</a></li>-->
                            <!--    <li class="list-inline-item"><a href="tokenomics">Roadmap</a></li>-->
                            <!--    <li class="list-inline-item"><a href="contact">How It Works</a></li>-->
                            <!--    <li class="list-inline-item"><a href="blog">Blog</a></li>-->
                            <!--    <li class="list-inline-item"><a href="login">Privacy Policy</a></li>-->
                            <!--</ul>-->
                            <!-- Copyright Area -->
                            <div class="copyright-area py-4">&copy;2022 PledgeStake, All Rights Reserved By
                                <a>CRYPTO SCIENCE Foundation</a></div>
                            </div>
                            </div>
                            <div class="copyright-area py-4">PledgeStake Contract Link <a href="https://polygonscan.com/address/0x67953e51bf9abd8d6c309195968f1b1277794a21" target="blank"> <img src="assets/img/content/poly.png" alt=""></a></div>
                            </div>
                        <!-- Scroll To Top -->
                        <div id="scroll-to-top" class="scroll-to-top">
                            <a href="#header" class="smooth-anchor">
                                <i class="fa-solid fa-arrow-up"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <!--====== Footer Area End ======-->

        <!--====== Modal Search Area Start ======-->
        <div id="registerModal" class="modal fade animate__animated show">
            <div class="modal-dialog dialog-animated modal-xl">
                <div class="modal-content h-100">
                    <div class="modal-header" data-dismiss="modal">
                    <i class="far fa-times-circle icon-close"></i>
                    </div>
                    <div class="modal-body">
                        <form class="row">
                            <div class="col-12 align-self-center">
                                <div class="row">
                                    <div class="col-12 pb-3">
                                        <h6 class="search-title mt-0 mb-3">Register</h6>
                                        <h6 class="search-title mt-0 mb-3">Confirm Your Founder</h6>
                                        <small class="messageJoin">...</small>
                                        <p class="joinRefer">...</p>
                                        <p class="waitingConfirm"></p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 input-group align-self-center">
                                        <button class="btn input-btn mt-2 registerBut">Confirm</button>
                                        <button class="btn btn-bordered-white mt-2 ml-1" data-dismiss="modal" >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--====== Modal Search Area End ======-->

        <!--====== Modal Responsive Menu Area Start ======-->
        <div id="menu" class="modal fade p-0">
            <div class="modal-dialog dialog-animated">
                <div class="modal-content h-100">
                    <div class="modal-header" data-dismiss="modal">
                        Menu <i class="far fa-times-circle icon-close"></i>
                    </div>
                    <div class="menu modal-body">
                        <div class="row w-100">
                            <div class="items p-0 col-12 text-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--====== Modal Responsive Menu Area End ======-->

    </div>


    <!-- ***** All jQuery Plugins ***** -->

    <!-- jQuery(necessary for all JavaScript plugins) -->
    <script src="assets/js/vendor/jquery.min.js"></script>

    <!-- Bootstrap js -->
    <script src="assets/js/vendor/popper.min.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>

    <!-- Plugins js -->
    <!-- <script src="assets/js/web3.min.js"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script src="assets/js/common.js"></script>
    <script src="assets/js/busd_live.js"></script>
    <script src="assets/js/sweetAlert.min.js"></script>
    <script src="assets/js/vendor/all.min.js"></script>
    <script src="assets/js/vendor/gallery.min.js"></script>
    <script src="assets/js/vendor/slider.min.js"></script>
    <script src="assets/js/vendor/countdown.min.js"></script>
    <script src="assets/js/vendor/shuffle.min.js"></script>

    <!-- Active js -->
    <script src="assets/js/main.js"></script>
</body>

</html>
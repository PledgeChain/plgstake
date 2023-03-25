@extends('mainlayout')
@section('page-data') 

        <!-- ***** Project Area Start ***** -->
        <section class="explore-area prev-project-area load-more">
            <div class="container">
                <div class="row items ">                                        
                    <div class="col-xl-12 col-lg-12 col-md-12">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <h3 class="mt-3 mb-0">Stake Pledge Token</h3>
                            </div>
                        </div>
                    </div>                    
                    <div class="col-xl-6 col-lg-6 col-md-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/mtc.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">My Matic Balance</h4>
                                        <h6 class="mt-3 mb-0"><span class="maticBal">0.00</span> Matic</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                <img class="card-img-top avatar-max-lg" src="assets/img/content/nplgcoin.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">My $PLG Balance</h4>
                                        <h6 class="mt-3 mb-0"><span class="plgBal">0.00</span> $PLG</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center staking-area mt-4">
                    <div class="col-12 col-md-12">
                        <!-- Single Accordion Item -->
                        <div class="single-accordion-item">
                            <!-- Card Header -->
                            <div class="card-header bg-inherit border-0 p-0">
                                <h2 class="m-0">
                                    <div class="btn staking-btn d-block text-left">
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <div class="media flex-column flex-md-row">
                                                    <img class="avatar-max-lg" src="assets/img/content/pledge_stake.png" alt="">
                                                    <div class="content media-body mt-4 mt-md-0 ml-md-4">
                                                        <h4 class="m-0">Participate in $PLG Stake</h4>
                                                        <p>Stake your $PLG and earn 15% of your stake every round of 10 days. Renewal of stake is mandatory to withdraw your reward in required before. 1 extra day will be added to every round after every two rounds completed</p>
                                                        <p class="text-danger">*Minimum deposit 50 $PLG ratio of 50 $PLG Max. 2000 $PLG</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row staking-info align-items-center justify-content-center mt-4 mt-md-5">
                                            <div class="col single-item">
                                                <span class="stakeAmount">50</span>
                                                <span>$PLG</span>
                                            </div>
                                            <div class="col single-item">
                                                <span>15%</span>
                                                <span>Reward</span>
                                            </div>
                                            <div class="col single-item">
                                                <span class="total">57.5</span>
                                                <span>Total</span>
                                            </div>
                                        </div>
                                    </div>
                                </h2>
                            </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <div class="row">
                                        <!-- Single Staking Item -->
                                        <div class="col-12 col-md-12 col-lg-12 col-xl-12 single-staking-item input-box">
                                            <span class="item-title mb-2">Stake</span>
                                            <div class="input-area d-flex flex-column">
                                                <div class="input-text">
                                                    <input type="text" class="inputAmount" placeholder="0.00">
                                                    <a>$PLG</a>
                                                </div>
                                                <button class="btn input-btn mt-2 stakeBut"><i class="fa-solid fa-lock mr-1"></i>Stake</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>    
        </section>
        
        <!-- ***** Project Area End ***** -->

@endsection
     
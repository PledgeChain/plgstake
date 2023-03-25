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
                                <h3 class="mt-3 mb-0">Splinter Account</h3>
                            </div>
                        </div>
                    </div>                    
                    <!-- <div class="col-xl-12 col-lg-12 col-md-12 mt-4"> -->
                        <!-- Project Card -->
                        <!-- <div class="card project-card prev-project-card"> -->
                            <!-- Project Content -->
                            <!-- <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/split.png" alt="">
                                    <div class="content ml-4">
                                        <h6 class="m-0">Available Splinter Balance</h6> -->
                                        <!-- <input type="text" class="form-control freezingAmt"  readonly="true" value="50" /> -->
                                        <!-- <h6 class="mt-3 mb-0"><span class="freezingAmt">0.00</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
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
                                                <img class="card-img-top avatar-max-lg" src="assets/img/content/pledge_stake.png" alt="">
                                                    <div class="content media-body mt-4 mt-md-0 ml-md-4">
                                                        <h6 class="m-0">Share stake income with friend and family</h6>
                                                        <p>You can send amount to other users by transferring them and their account will be funded from here. You can also register someone and stake his/her account from hee</p>
                                                        <p class="text-danger">*Minimum Splinter 50 $PLG needed to perform splinter</p>
                                                    </div>
                                                </div>
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
                                            <span class="item-title mb-2" for="InputBusd">Splinter</span>
                                            <div class="input-area d-flex flex-column">
                                            Available amount in Splinter
                                                <div class="input-text">
                                                    <input type="text" class="freezingAmt" id="InputBusd" readonly="true"  placeholder="0.00">
                                                    <a>$PLG</a>                
                                                </div>
                                            Input Amount to Splint
                                                <div class="input-text">
                                                    <input type="text" class="tAmount" id="InputBusd"  value="50" placeholder="0.00">
                                                    <a>$PLG</a>                
                                                </div>
                                                Beneficiary's Address
                                                <div class="input-text">
                                                    <input type="text" class="receiver" id="InputReceiverAddress" placeholder="Beneficiary's Address">                                                      
                                                </div>
                                                <p class="text-danger">The ratio of 50</p>
                                                <a href="JavaScript:void(0);" class="btn input-btn mt-2 depositFreezing"><i class="fa-solid fa-bolt mr-1"></i>Deposit</a>
                                                <a href="JavaScript:void(0);" class="btn input-btn mt-2 transferFreezing"><i class="fa-solid fa-share-from-square mr-1"></i>Transfer</a>
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
     
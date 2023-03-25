@extends('mainlayout')

@section('page-data') 

        <!-- ***** Project Area Start ***** -->
        <section class="explore-area prev-project-area load-more">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <span class="intro-text">Dashboard</span>
                                <h3 class="mt-3 mb-3">Contract Information</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row items ">
                    <div class="col-12 ">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/pledge_stake.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Stake Contract Address</h4>
                                        <h6 class="mt-3 mb-0"><span class="contractAddress">...</span></h6>
                                    </div>
                                </div>
                                <div class="blockchain d-inline-block mr-1 mr-md-0">
                                    <img src="assets/img/content/matic.png" alt="">
                                </div>
                                <div class="single-item">Running Time
                                <span class="runTime">...</span>
                                </div>
                                <br>
                                <div class="blockchain d-inline-block mr-1 mr-md-0">
                                    <img src="assets/img/content/nplgcoin.png" style="width: 32px;" alt="">
                                </div>
                                <div class="single-item">
                                    <span>My Stake Time:</span>
                                    <span class="stakeCountDown">...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/money.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Yield Plan</h4>
                                        <h6 class="mt-3 mb-0">1 Round = 10 Days</h6>
                                    </div>
                                </div>
                                <div class="blockchain d-inline-block mr-1 mr-md-0">
                                    <img src="assets/img/content/nplgcoin.png" style="width: 32px;" alt="">
                                </div>
                                <div class="single-item">
                                <span>Stake Reward:</span>
                                    <span> 15% Per Round</span>
                                </div>
                                <br>
                                <div class="blockchain d-inline-block mr-1 mr-md-0">
                                    <img src="assets/img/content/pledge_stake.png" style="height:32px;" alt="">
                                </div>
                                <div class="single-item">
                                    <span>Re-Stake On Reward</span>
                                    <span>Required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/trust.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Add $PLG to Wallet</h4>
                                        <!-- <h6 class="mt-3 mb-0">1 Round = 10 Days</h6> -->
                                    </div>
                                </div>
                                <!-- <div class="blockchain d-inline-block mr-1 mr-md-0">
                                    <img src="assets/img/content/$plg.png" alt="">
                                </div> -->
                                <div class="single-item">
                                <span>Click this button to add $PLG to your wallet and $PLG will start displaying in your wallet.</span>
                                </div>
                                <br>
                            </div>
                            <button onClick="addTokenFunction()" class="btn input-btn mt-2 md-0 ml-md-3 mt-3" id="addToken">Add $PLG</button>
                        </div>
                    </div>
                    <div class="col-12">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <h3 class="mt-3 mb-0">Statistics Information</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 item">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/stats.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Stakers Count</h4>
                                        <h6 class="mt-3 mb-0"><span class=" totalUser">0</span></h6>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 item">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/luck.png" alt="">
                                    <div class="content ml-4">
                                    <h4 class="m-0">Luck Lotto Prize Today</h4>
                                        <h6 class="mt-3 mb-0"><span class="luckPool">0.00</span></h6>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 item">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/crown.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Star Prize Today</h4>
                                        <h6 class="mt-3 mb-0"><span class="starPool">0.00</span></h6>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 item">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/network.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Top Referral Prize Today</h4>
                                        <h6 class="mt-3 mb-0"><span class="topPool">0.00</span></h6>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12 col-lg-12 col-md-12">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <h3 class="mt-3 mb-0">My Information</h3>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/rank.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">My Ranking</h4>
                                        <h6 class="mt-3 mb-0"><span class="mylevel">
                                        <span class="level"><i class="far fa-star fa-2x"></i></span>
                                        <span class="level"><i class="far fa-star fa-2x"></i></span>
                                        <span class="level"><i class="far fa-star fa-2x"></i></span>
                                        <span class="level"><i class="far fa-star fa-2x"></i></span>
                                        <span class="level"><i class="far fa-star fa-2x"></i></span>
                                         </span></h6>
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
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/reward.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">My Rewards</h4>
                                        <h6 class="mt-3 mb-0"><span class="withdrawn">0.00</span></h6>
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
                    <div class="col-xl-6 col-lg-6 col-md-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/invite.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">My Inviter</h4>
                                        <h6 class="mt-3 mb-0"><span class="referAddr">...</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between mb-3">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/share.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">My Referral Link</h4>                                        
                                    </div>
                                </div>
                            </div>
                                        <div class="input-text mb-4" >
                                            <input class=" refLink" id="ref-link" readonly="readonly" type="text" value="refLink" >
                                        </div>                                                 
                            <a href="javascript:;" class="btn input-btn mt-2 mt-md-0 ml-md-3 copyLink">Copy</a>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <h3 class="mt-3 mb-0">Latest Stakes</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 leaderboard-area">
                    <div class="card project-card prev-project-card">
                        <div class="table-responsive">
                            <table class="table token-content table-borderless">
                                <thead>
                                    <tr>
                                        <th style="width: 60%;" scope="col">Address</th>
                                        <th style="width: 15%;" scope="col">Time</th>
                                        <th style="width: 15%;" scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="latestStake">NULL</td>
                                        <td style="width: 15%;" class="latestStakeTime">...</td>
                                        <td style="width: 15%;" class="latestAmount">...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
                    </div>
                </div> 
                <div class="col-12 mb-3">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <h3 class="mt-3 mb-0">Lucky Guys</h3>
                            </div>
                        </div>
                </div>
                <div class="col-12 leaderboard-area">
                    <div class="card project-card prev-project-card">
                        <div class="table-responsive">
                            <table class="table token-content table-borderless">
                                <thead>
                                    <tr>
                                        <th style="width: 60%;" scope="col">Address</th>
                                        <th style="width: 15%;" scope="col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="luckUser">NULL</td>
                                        <td style="width: 15%;" class="luckStake">...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
                    </div>
                </div>
                <div class="col-12 mb-3">
                        <!-- Intro -->
                        <div class="intro d-flex justify-content-between align-items-end m-0">
                            <div class="intro-content">
                                <h3 class="mt-3 mb-0">Top Stars</h3>
                            </div>
                        </div>
                </div>
                <div class="col-12 leaderboard-area">
                    <div class="card project-card prev-project-card">
                        <div class="table-responsive">
                            <table class="table token-content table-borderless">
                                <thead>
                                    <tr>
                                        <th style="width: 60%;" scope="col">Address</th>
                                        <th style="width: 15%;" scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="width: 60%;" class="dayTopUser">NULL</td>
                                        <td style="width: 15%;"><i class="fas fa-level-down-alt text-danger"></i></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="dayTopUser">NULL</td>
                                        <td style="width: 15%;"><i class="fas fa-level-up-alt text-success"></i></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 60%;" class="dayTopUser">NULL</td>
                                        <td style="width: 15%;"><i class="fas fa-level-up-alt text-danger"></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
                    </div>
                </div>
            </div>    
        </section>
        
        <!-- ***** Project Area End ***** -->
@endsection
     
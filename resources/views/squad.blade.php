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
                                <h3 class="mt-3 mb-0">Squad(Team Details)</h3>
                            </div>
                        </div>
                    </div>                    
                    <div class="col-xl-6 col-lg-6 col-md-12 mt-4">
                        <!-- Project Card -->
                        <div class="card project-card prev-project-card">
                            <!-- Project Content -->
                            <div class="project-content d-md-flex flex-column flex-md-row align-items-center justify-content-md-between">
                                <div class="item-header d-flex align-items-center mb-4 mb-md-0">
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/sale.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Total Sales</h4>
                                        <h6 class="mt-3 mb-0"><span class="totalTeamDeposit">0.00</span></h6>
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
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/team.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Team Count</h4>
                                        <h6 class="mt-3 mb-0"><span class="totalInvited">0.00</span></h6>
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
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/teams.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Strong Team(A)</h4>
                                        <h6 class="mt-3 mb-0"><span class="maxDirectDeposit">0.00</span></h6>
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
                                    <img class="card-img-top avatar-max-lg" src="assets/img/content/teamw.png" alt="">
                                    <div class="content ml-4">
                                        <h4 class="m-0">Other Team(B)</h4>
                                        <h6 class="mt-3 mb-0"><span class="otherDirectDeposit">0.00</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="staking-area col-xl-12 col-lg-12 col-md-12 mt-4">
                        <!-- Single Accordion Item -->
                        <div class="single-accordion-item">
                            <!-- Card Header -->
                            <div class="card-header bg-inherit border-0 p-0">
                                <h2 class="m-0">
                                    <div class="btn staking-btn d-block text-left">
                                        <div class="row">
                                            <div class="col-12 col-md-8">
                                                <div class="media flex-column flex-md-row">
                                                    <img class="avatar-max-lg" src="assets/img/content/plgst.png" alt="">
                                                    <div class="content media-body mt-4 mt-md-0 ml-md-4">
                                                        <h4 class="m-0">Your Squad(Team Details)</h4>
                                                        <p>Find all details related to your squad in this section</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </h2>
                            </div>
                                <!-- Card Body -->
                                <div class="col-12 leaderboard-area">
                                <div class="card project-card prev-project-card">
                                    <div class="table-responsive">
                                        <table class="table token-content table-borderless table DepTab2">
                                        <tbody>
                                                <tr>
                                                    <th  scope="col">Address</th>
                                                    <th  scope="col">Level</th>
                                                    <th  scope="col">Layer</th>
                                                    <th  scope="col">Status</th>
                                                    <th  scope="col">Time</th>
                                                </tr>
                                            </thead>                                
                                            </tbody>
                                        </table>
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
     
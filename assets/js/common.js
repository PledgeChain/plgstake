const REFERER_DEFAULT = "0xc1Df77e5314b5193c3C3EC3213251B9E30eb2DD0";
const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
var MY_CONTRACT;
var PLG_CONTRACT;

var autoRefresh = 2000;
var timeStep = 24 * 60 * 60;
var lang = (localStorage.getItem("lang") === null) ? 'en':  localStorage.getItem("lang");
var web3;
var networkId;
var accounts = [];
var userAddr;
var matic_wei_account_balance = 0;
var matic_format_account_balance = 0;
var plgBalance = 0;
var gasLimit;
var estimateGas;

var refer = "";
var staticReward;
var otherRewards;
var capitalUnfreezed;

var curDay = 0;
var lastDistribute = 0;
var totalUser = 0;
var luckPool = 0;
var starPool = 0;
var topPool = 0;
var userMaxStake = 0;
var input;
var inputOk = false;

var perDay = 24*60*60; 
var perHour = 60*60;
var perMinute = 60;
var updated = false;
var myMsg = '';
var myMsg1 = '';

const web3init = async() => {
    if (window.ethereum) 
    {
        try
        {
            web3 = new Web3(window.ethereum);
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAddr = accounts[0];
            let short_user_address = userAddr.substring(0, 8) + "..." + userAddr.substring(MY_CONTRACT_ADDRESS.length - 8);
            $('.userAddress').text(short_user_address);
            matic_wei_account_balance = await web3.eth.getBalance(userAddr);
            matic_format_account_balance = web3.utils.fromWei(matic_wei_account_balance, 'ether');
            gasLimit = web3.utils.toHex(web3.utils.toWei('0.00083026', 'gwei'));
            estimateGas = web3.utils.toHex(web3.utils.toWei('200', 'gwei'));                
            MY_CONTRACT = new web3.eth.Contract(MY_CONTRACT_ABI, MY_CONTRACT_ADDRESS);
            PLG_CONTRACT = new web3.eth.Contract(PLG_ABI, PLG_CONTRACT_ADDRESS);
            plgBalance = await PLG_CONTRACT.methods.balanceOf(userAddr).call();
            plgBalance = web3.utils.fromWei(plgBalance, 'ether');
            plgBalance = parseFloat(plgBalance).toFixed(2);
            isRegisteredCheck();
            window.ethereum.on('accountsChanged', function (accounts) {
                location.reload();
            });
        }
        catch(error)
        {
            if(lang == 'ae') myMsg = 'يمكن للمستخدم رفض الطلب لشيء مفقود أو معلومات غير صحيحة';
            if(lang == 'ru') myMsg = 'Пользователь может отклонить запрос на отсутствующую или неправильную информацию';
            if(lang == 'kp') myMsg = '사용자는 누락되거나 잘못된 정보에 대한 요청을 거부할 수 있습니다.';
            if(lang == 'en') myMsg = 'User can reject request for something missing or incorrect information.';
            Swal.fire({
                position: 'center',
                icon: 'error',
                text: myMsg,
                showConfirmButton: true,
            });
            console.log(`User can rejected request, Metamask say ${error.message}`); 
        }
    }
    else
    {
        if(lang == 'ae') myMsg = 'لم يتم العثور على أي شبكة binance. يرجى تثبيت metamask و tokenpocket و Trust Wallet وأي محفظة أو امتداد آخر مدعوم.';
        if(lang == 'ru') myMsg = 'Ни одна сеть binance не найдена. Пожалуйста, установите metamask, tokenpocket, trust wallet и любой другой поддерживаемый кошелек или расширение.';
        if(lang == 'kp') myMsg = '바이낸스 네트워크를 찾을 수 없습니다. 메타마스크, 토큰 포켓, 트러스트 월렛 및 기타 지원되는 월렛 또는 확장 프로그램을 설치하십시오.';
        if(lang == 'en') myMsg = 'Any binance network not found. Please install metamask, tokenpocket, trust wallet and any other supported wallet or extension.';
        Swal.fire({
            position: 'center',
            icon: 'error',
            text: myMsg,
            showConfirmButton: true,
        });
    }
}

(async() =>{
	await web3init();
    setInterval(async() => {        
        isRegisteredCheck();
        if($('body').is('.dashboardPage'))
        {
            updateCommonInfo();
            setRefLink();
            updateSysInfo();
            updateUserInfo();
            updateRewardInfo();
            lotteryCountdown();
        }

        if($('body').is('.fundHistoryPage')){
            updateCommonInfo();            
            if(!updated)
            {
                updateOrders();    
            }
        }
        
        if($('body').is('.depositPage'))
        {
            $('.maticBal').text(parseFloat(matic_format_account_balance).toFixed(2));
            $('.plgBal').text(plgBalance);
        }                

        if($('body').is('.crowdPage')){
            updateCommonInfo();
            if(!updated)
            {
                updateTeamInfos(0, 20);
            }
        }

        if($('body').is('.riftAccountPage'))
        {
            updateUserInfo();
        }

        if($('body').is('.homePage'))
        {
            homePageInfo();
            
        }

        if($('body').is('.withdrawPage'))
        {
            updateRewardInfo();
        }
    }, autoRefresh);

    if($('body').is('.dashboardPage'))
    {
        $(".copyLink").on("click", function(){
            var copyText = document.getElementById('ref-link');
            if(lang == 'ae') myMsg = 'تم نسخ الرابط بنجاح.';
            if(lang == 'ru') myMsg = 'Ссылка успешно скопирована.';
            if(lang == 'kp') myMsg = '링크가 복사되었습니다.';
            if(lang == 'en') myMsg = 'Link copied Successfully.';
            
            copyText.select();
            copyText.setSelectionRange(0, 99999)
            document.execCommand("copy");
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: myMsg,
                showConfirmButton: false,
                timer: 2000
            });
        });

        $(".registerBut").on("click", async function() {
            $(this).remove();
            if(lang == 'ae') myMsg = 'الرجاء الانتظار أثناء تأكيد طلبك ...';
            if(lang == 'ru') myMsg = 'Подождите, подтверждая запрос...';
            if(lang == 'kp') myMsg = '요청을 확인하는 동안 잠시 기다려 주십시오...';
            if(lang == 'en') myMsg = 'Please wait while confirming your request...';
            $('.waitingConfirm').html(myMsg);
            
            var { maxStake } = await MY_CONTRACT.methods.userInfo(refer).call();
            minStake = web3.utils.fromWei(maxStake, 'ether');
            if(parseInt(minStake) < 50 && REFERER_DEFAULT !== '0xc1Df77e5314b5193c3C3EC3213251B9E30eb2DD0')
            {
                if(lang == 'ae') myMsg = 'هذا عنوان محفظة الإحالة غير النشط.';
                if(lang == 'ru') myMsg = 'Это неактивный адрес реферального кошелька.';
                if(lang == 'kp') myMsg = '비활성 참조 지갑 주소입니다.';
                if(lang == 'en') myMsg = 'This is inactive refer wallet address.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return false;
            }
            
            if(matic_format_account_balance < 0.001)
            {
                if(lang == 'ae') myMsg = 'رصيد Matic غير كافٍ.';
                if(lang == 'ru') myMsg = 'Недостаточный баланс Matic.';
                if(lang == 'kp') myMsg = 'Matic 잔액이 충분하지 않습니다.';
                if(lang == 'en') myMsg = 'Insufficient Matic Balance.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return false;
            }
            await MY_CONTRACT.methods.register(refer).estimateGas({from: userAddr}).then(async function(gasAmount){
                if(gasAmount >= 8000000)
                {
                    if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
                    if(lang == 'ru') myMsg = 'У метода закончился газ.';
                    if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
                    if(lang == 'en') myMsg = 'Method ran out of gas.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    return false;
                }
                await MY_CONTRACT.methods.register(refer).send({ from: userAddr, gasPrice: estimateGas, gas: gasAmount }).on('confirmation', function(confirmationNumber, receipt){
                    if(confirmationNumber > 0 && confirmationNumber < 2)
                    {
                        if(lang == 'ae') myMsg = 'أكملت تسجيل.';
                        if(lang == 'ru') myMsg = 'Регистрация завершена.';
                        if(lang == 'kp') myMsg = '등록이 완료되었습니다.';
                        if(lang == 'en') myMsg = 'Registration Completed.';

                        if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                        if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                        if(lang == 'kp') myMsg1 = '거래 해시';
                        if(lang == 'en') myMsg1 = 'Your transaction hash';
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: myMsg,
                            text: `${myMsg1} \n ${receipt.transactionHash}`,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        window.location.href = './dashboard';
                        return false;
                    }
                }).on('error', function(error, receipt) { 
                    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: error.message,
                        text: receipt,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                });
            })
            .catch(function(error){
                if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
                if(lang == 'ru') myMsg = 'У метода закончился газ.';
                if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
                if(lang == 'en') myMsg = 'Method ran out of gas.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return false;
            });
            
            await sleep(2000).then(async function(){
                location.reload();
            })
            .catch((error) => {
                if(lang == 'ae') myMsg = 'هناك خطأ ما أثناء التسجيل.';
                if(lang == 'ru') myMsg = 'Что-то не так при регистрации.';
                if(lang == 'kp') myMsg = '등록하는 동안 문제가 발생했습니다.';
                if(lang == 'en') myMsg = 'Something is wrong while registration.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            });
        });
    
    }

    if($('body').is('.fundHistoryPage')){
        updateCommonInfo();
        if(!updated)
        {
            updateOrders();
        }
    }
    
    if($('body').is('.depositPage'))
    {
        $(".inputAmount").on("input", function() {
            var inputAmount = $(".inputAmount").val();
            input = parseInt(inputAmount);
            if(!input)
            {
                input = 0;
            }
            $(".stakeAmount").text(input);
            var total = parseFloat(input*15/100) + parseFloat(input);
            $(".total").text(total.toFixed(2));
            if(input % 1 == 0 && input >= 1 && input >= userMaxStake){
                if(input <= 2000){
                    inputOk = true;
                }else{
                    inputOk = false;
                }
            }
            else
            {
                inputOk = false;
            }
            if(inputOk)
            {
                $(".stakeBut").css({"background":"#3E6FFB"});
            }
            else
            {
                $(".stakeBut").css({"background":"gray"});
                $(".stakeBut").css({"border":"1px solid gray"});
            }
        })
    
        $(".stakeBut").on("click", async function(){
            if(inputOk){
                var amount = web3.utils.BN(web3.utils.toWei(input.toString(), 'ether')).toString();
                amountEth = web3.utils.fromWei(amount, 'ether');
                
                var { maxStake } = await MY_CONTRACT.methods.userInfo(userAddr).call();
                minStake = web3.utils.fromWei(maxStake, 'ether');
                if(parseInt(minStake) < 1)
                {
                    minStake = 50;
                }
                // minimum 50 balance required
                if(parseInt(amountEth) < parseInt(minStake))
                {
                    if(lang == 'ae') myMsg = 'الحد الأدنى للإيداع';
                    if(lang == 'ru') myMsg = 'Минимальный депозит';
                    if(lang == 'kp') myMsg = '최소 보증금';
                    if(lang == 'en') myMsg = 'Minimum stake';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `${myMsg} ${minstake} PLEDGE.`,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    return false;
                }

                // multiple of 50 balance required
                if(parseInt(amountEth) % 50 != '0')
                {
                    if(lang == 'ae') myMsg = 'مضاعفات 50 مليار دولار أمريكي.';
                    if(lang == 'ru') myMsg = 'Кратность 50 PLEDGE.';
                    if(lang == 'kp') myMsg = '50 PLEDGE의 배수.';
                    if(lang == 'en') myMsg = 'Multiple of 50 PLEDGE.';

                    if(lang == 'ae') myMsg1 = 'يجب أن يكون مبلغ الإيداع من مضاعفات 50 دولارًا أمريكيًا.';
                    if(lang == 'ru') myMsg1 = 'Сумма депозита должна быть кратна 50 PLEDGE.';
                    if(lang == 'kp') myMsg1 = '입금액은 50 PLEDGE의 배수여야 합니다.';
                    if(lang == 'en') myMsg1 = 'Stake amount must be multiple of 50 PLEDGE.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        text: myMsg1,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    return false;
                }
                
                // balance check
                if(parseInt(plgBalance) < parseInt(amountEth))
                {
                    if(lang == 'ae') myMsg = 'رصيد PLEDGE غير كاف.';
                    if(lang == 'ru') myMsg = 'Недостаточный баланс PLEDGE.';
                    if(lang == 'kp') myMsg = 'PLEDGE 잔액이 충분하지 않습니다.';
                    if(lang == 'en') myMsg = 'Insufficient PLEDGE Balance.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    return false;
                }
                
                var isAppr = await isApprove(MY_CONTRACT_ADDRESS);
                if(isAppr)
                {
                    await MY_CONTRACT.methods.stake(amount).estimateGas({from: userAddr}).then(async function(gasAmount){
                        if(gasAmount >= 8000000)
                        {
                            if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
                            if(lang == 'ru') myMsg = 'У метода закончился газ.';
                            if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
                            if(lang == 'en') myMsg = 'Method ran out of gas.';
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: myMsg,
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                            });
                            return false;
                        }
                        else
                        {
                            //gasLimit = web3.utils.toHex(web3.utils.fromWei(gasAmount, 'gwei'));
                            estimateGas = web3.utils.toHex(web3.utils.toWei('300', 'gwei'));     
                            await MY_CONTRACT.methods.stake(amount).send({ from: userAddr, gasPrice: estimateGas, gas: gasAmount })
                            .on('transactionHash', function(hash){
                                if(lang == 'ae') myMsg = 'تم تقديم طلب الإيداع بنجاح.';
                                if(lang == 'ru') myMsg = 'Запрос на депозит отправлен успешно.';
                                if(lang == 'kp') myMsg = '입금 요청이 성공적으로 제출되었습니다.';
                                if(lang == 'en') myMsg = 'Stake request submittted successfully.';

                                if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                                if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                                if(lang == 'kp') myMsg1 = '거래 해시';
                                if(lang == 'en') myMsg1 = 'Your transaction hash';

                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: myMsg,
                                    text: `${myMsg1} \n ${hash}`,
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                });
                            })
                            .on('confirmation', function(confirmationNumber, receipt){
                                if(confirmationNumber > 0 && confirmationNumber < 2)
                                {
                                    if(lang == 'ae') myMsg = 'تم تأكيد طلب الإيداع بنجاح.';
                                    if(lang == 'ru') myMsg = 'Запрос на депозит успешно подтвержден.';
                                    if(lang == 'kp') myMsg = '입금 요청이 성공적으로 확인되었습니다.';
                                    if(lang == 'en') myMsg = 'Stake request confirmed successfully.';

                                    if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                                    if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                                    if(lang == 'kp') myMsg1 = '거래 해시';
                                    if(lang == 'en') myMsg1 = 'Your transaction hash';
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: myMsg,
                                        text: `${myMsg1} \n ${receipt.transactionHash}`,
                                        showConfirmButton: false,
                                        timer: 2000,
                                        timerProgressBar: true,
                                    });
                                    window.location.href = './stake-history';
                                    return false;
                                }
                            })
                            .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                                if(error)
                                {
                                    if(lang == 'ae') myMsg = 'هناك خطأ ما أثناء إيداع الطلب';
                                    if(lang == 'ru') myMsg = 'Что-то не так при отправке запроса';
                                    if(lang == 'kp') myMsg = '요청을 입금하는 동안 문제가 발생했습니다.';
                                    if(lang == 'en') myMsg = 'Something is wrong while staking request';
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: myMsg,
                                        text: error,
                                        showConfirmButton: false,
                                        timer: 2000,
                                        timerProgressBar: true,
                                    });
                                    return false;
                                }
                            });
                        }
                       
                    })
                    .catch(function(error){
                        if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
                        if(lang == 'ru') myMsg = 'У метода закончился газ.';
                        if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
                        if(lang == 'en') myMsg = 'Method ran out of gas.';
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: myMsg,
                            text: error.message,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                        return false;
                    });
                }
                else
                {
                    setApprove(MY_CONTRACT_ADDRESS).then(async function(error){
                        if(error)
                        {
                            if(lang == 'ae') myMsg = 'هناك خطأ ما أثناء إيداع الطلب';
                            if(lang == 'ru') myMsg = 'Что-то не так при отправке запроса';
                            if(lang == 'kp') myMsg = '요청을 입금하는 동안 문제가 발생했습니다.';
                            if(lang == 'en') myMsg = 'Something is wrong while staking request';
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: myMsg,
                                text: error.message,
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                        else
                        {
                            await MY_CONTRACT.methods.stake(amount).estimateGas({from: userAddr}).then(async function(gasAmount){
                                if(gasAmount >= 8000000)
                                {
                                    if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
                                    if(lang == 'ru') myMsg = 'У метода закончился газ.';
                                    if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
                                    if(lang == 'en') myMsg = 'Method ran out of gas.';
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'error',
                                        title: myMsg,
                                        showConfirmButton: false,
                                        timer: 2000,
                                        timerProgressBar: true,
                                    });
                                    return false;
                                }
                                else
                                {
                                    //gasLimit = web3.utils.toHex(web3.utils.fromWei(gasAmount, 'gwei'));
                                    estimateGas = web3.utils.toHex(web3.utils.toWei('300', 'gwei'));     
                                    await MY_CONTRACT.methods.stake(amount).send({ from: userAddr, gasPrice: estimateGas, gas: gasAmount })
                                    .on('transactionHash', function(hash){
                                        if(lang == 'ae') myMsg = 'تم تقديم طلب الإيداع بنجاح.';
                                        if(lang == 'ru') myMsg = 'Запрос на депозит отправлен успешно.';
                                        if(lang == 'kp') myMsg = '입금 요청이 성공적으로 제출되었습니다.';
                                        if(lang == 'en') myMsg = 'Stake request submittted successfully.';

                                        if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                                        if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                                        if(lang == 'kp') myMsg1 = '거래 해시';
                                        if(lang == 'en') myMsg1 = 'Your transaction hash';
                                        Swal.fire({
                                            position: 'center',
                                            icon: 'success',
                                            title: myMsg,
                                            text: `${myMsg1} \n ${hash}`,
                                            showConfirmButton: false,
                                            timer: 2000,
                                            timerProgressBar: true,
                                        });
                                    })
                                    .on('confirmation', function(confirmationNumber, receipt){
                                        if(confirmationNumber > 0 && confirmationNumber < 2)
                                        {
                                            if(lang == 'ae') myMsg = 'تم تأكيد طلب الإيداع بنجاح.';
                                            if(lang == 'ru') myMsg = 'Запрос на депозит успешно подтвержден.';
                                            if(lang == 'kp') myMsg = '입금 요청이 성공적으로 확인되었습니다.';
                                            if(lang == 'en') myMsg = 'Stake request confirmed successfully.';

                                            if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                                            if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                                            if(lang == 'kp') myMsg1 = '거래 해시';
                                            if(lang == 'en') myMsg1 = 'Your transaction hash';
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'success',
                                                title: myMsg,
                                                text: `${myMsg1} \n ${receipt.transactionHash}`,
                                                showConfirmButton: false,
                                                timer: 2000,
                                                timerProgressBar: true,
                                                
                                            });
                                            window.location.href = './stake-history';
                                            return false;
                                        }
                                    })
                                    .on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                                        if(error)
                                        {
                                            if(lang == 'ae') myMsg = 'هناك خطأ ما أثناء إيداع الطلب';
                                            if(lang == 'ru') myMsg = 'Что-то не так при отправке запроса';
                                            if(lang == 'kp') myMsg = '요청을 입금하는 동안 문제가 발생했습니다.';
                                            if(lang == 'en') myMsg = 'Something is wrong while staking request';
                                            Swal.fire({
                                                position: 'center',
                                                icon: 'error',
                                                title: myMsg,
                                                text: error,
                                                showConfirmButton: false,
                                                timer: 2000,
                                                timerProgressBar: true,
                                            });
                                            return false;
                                        }
                                    });
                                }
                               
                            })
                            .catch(function(error){
                                if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
                                if(lang == 'ru') myMsg = 'У метода закончился газ.';
                                if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
                                if(lang == 'en') myMsg = 'Method ran out of gas.';
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    title: myMsg,
                                    text: error.message,
                                    showConfirmButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                });
                                return false;
                            });
                        }
                    });
                }
            }
            else
            {
                if(lang == 'ae') myMsg = 'مبلغ الإيداع مطلوب.';
                if(lang == 'ru') myMsg = 'Требуемая сумма депозита.';
                if(lang == 'kp') myMsg = '예치금이 필요합니다.';
                if(lang == 'en') myMsg = 'Stake Amount Required.';

                if(lang == 'ae') myMsg1 = 'الرجاء إدخال مبلغ الإيداع أولاً.';
                if(lang == 'ru') myMsg1 = 'Сначала введите сумму депозита.';
                if(lang == 'kp') myMsg1 = '입금금액을 먼저 입력해주세요.';
                if(lang == 'en') myMsg1 = 'Please enter Stake amount first.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    text: myMsg1,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        });
    }
    

    if($('body').is('.crowdPage')){
        updateCommonInfo();
        if(!updated)
        {
            updateTeamInfos(0, 20);
        }
    }

    if($('body').is('.riftAccountPage'))
    {
        $(".stakeFreezing").on("click", async function() {
             gasLimit = web3.utils.toHex(web3.utils.toWei('0.00083026', 'gwei'));
             estimateGas = web3.utils.toHex(web3.utils.toWei('150', 'gwei'));
            var tAmount = $(".tAmount").val();            
            if(tAmount >= 50 && tAmount <= 2000 && tAmount % 50 == 0 && tAmount <= splitAmt){
                let deamount = web3.utils.BN(web3.utils.toWei(tAmount.toString(), 'ether')).toString();
                await MY_CONTRACT.methods.stakeBySplit(deamount).send({ from: userAddr, gasPrice: estimateGas, gas: gasLimit }, function(error, transactionHash){
                    if(error)
                    {
                        if(lang == 'ae') myMsg = 'خطأ أثناء استخدام الإيداع بطريقة التقسيم.';
                        if(lang == 'ru') myMsg = 'Ошибка при использовании депозита раздельным методом.';
                        if(lang == 'kp') myMsg = '분할 입금을 사용하는 동안 오류가 발생했습니다.';
                        if(lang == 'en') myMsg = 'Error while using stake by split method.';
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: myMsg,
                            text: error,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                    if(transactionHash)
                    {
                        if(lang == 'ae') myMsg = 'تم إرسال طلب الإيداع بطريقة التقسيم بنجاح.';
                        if(lang == 'ru') myMsg = 'Запрос на депозит методом разделения отправлен успешно.';
                        if(lang == 'kp') myMsg = '분할 방법으로 입금 요청이 성공적으로 제출되었습니다.';
                        if(lang == 'en') myMsg = 'Stake by split method request submitted successfully.';

                        if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                        if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                        if(lang == 'kp') myMsg1 = '거래 해시';
                        if(lang == 'en') myMsg1 = 'Your transaction hash';
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: myMsg,
                            text: `${myMsg1} \n ${transactionHash}`,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((error) => {
                    if(lang == 'ae') myMsg = 'خطأ أثناء استخدام الإيداع بطريقة التقسيم.';
                    if(lang == 'ru') myMsg = 'Ошибка при использовании депозита раздельным методом.';
                    if(lang == 'kp') myMsg = '분할 입금을 사용하는 동안 오류가 발생했습니다.';
                    if(lang == 'en') myMsg = 'Error while using Stake by split method.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        text: error.message,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                });
                await sleep(2000).then(async function(){
                    location.reload();
                })
                .catch((error) => {
                    if(lang == 'ae') myMsg = 'خطأ أثناء استخدام الإيداع بطريقة التقسيم.';
                    if(lang == 'ru') myMsg = 'Ошибка при использовании депозита раздельным методом.';
                    if(lang == 'kp') myMsg = '분할 입금을 사용하는 동안 오류가 발생했습니다.';
                    if(lang == 'en') myMsg = 'Error while using Stake by split method.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        text: error.message,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                });
            }
            else
            {
                if(lang == 'ae') myMsg = 'مطلوب مبلغ تحويل أو مضاعف 50 أو لا يزيد عن 2000 أو تقسيم مبلغ PLEDGE المطلوب.';
                if(lang == 'ru') myMsg = 'Требуемая сумма перевода или кратная 50 или не более 2000, или требуется разделить сумму PLEDGE.';
                if(lang == 'kp') myMsg = '필요한 이체 금액 또는 50의 배수 또는 2000 이하 또는 분할 버스 금액이 필요합니다.';
                if(lang == 'en') myMsg = 'Transfer amount required or multiple of 50 or not more than 2000 or split PLEDGE amount required.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: myMsg,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return false;
            }
        });
    
        $(".transferFreezing").on("click", async function() {
            var tAmount = $(".tAmount").val();
            var receiver = $(".receiver").val();
            if(web3.utils.isAddress(receiver)){
                if(tAmount >= 50 && tAmount <= 2000 && tAmount % 50 == 0 && tAmount <= splitAmt){
                    let tramount = web3.utils.BN(web3.utils.toWei(tAmount.toString(), 'ether')).toString();
                    await MY_CONTRACT.methods.transferBySplit(receiver, tramount).send({ from: userAddr, gasPrice: estimateGas, gas: gasLimit }, function(error, transactionHash){
                        if(error)
                        {
                            if(lang == 'ae') myMsg = 'خطأ أثناء استخدام أسلوب النقل بالتقسيم.';
                            if(lang == 'ru') myMsg = 'Ошибка при использовании переноса раздельным методом.';
                            if(lang == 'kp') myMsg = '분할 방법으로 전송을 사용하는 동안 오류가 발생했습니다.';
                            if(lang == 'en') myMsg = 'Error while using transfer by split method.';
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: myMsg,
                                text: error,
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                        if(transactionHash)
                        {
                            if(lang == 'ae') myMsg = 'تم إرسال طلب التحويل حسب طريقة التقسيم بنجاح.';
                            if(lang == 'ru') myMsg = 'Запрос на перенос по раздельному методу успешно отправлен.';
                            if(lang == 'kp') myMsg = '분할 방법으로 전송 요청이 성공적으로 제출되었습니다.';
                            if(lang == 'en') myMsg = 'Transfer by split method request submitted successfully.';

                            if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                            if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                            if(lang == 'kp') myMsg1 = '거래 해시';
                            if(lang == 'en') myMsg1 = 'Your transaction hash';
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: myMsg,
                                text: `${myMsg1} \n ${transactionHash}`,
                                showConfirmButton: false,
                                timer: 2000,
                                timerProgressBar: true,
                            });
                        }
                    })
                    .catch((error) => {
                        if(lang == 'ae') myMsg = 'خطأ أثناء استخدام أسلوب النقل بالتقسيم.';
                        if(lang == 'ru') myMsg = 'Ошибка при использовании переноса раздельным методом.';
                        if(lang == 'kp') myMsg = '분할 방법으로 전송을 사용하는 동안 오류가 발생했습니다.';
                        if(lang == 'en') myMsg = 'Error while using transfer by split method.';
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: myMsg,
                            text: error.message,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    });
                    await sleep(2000).then(async function(){
                        location.reload();
                    })
                    .catch((error) => {
                        if(lang == 'ae') myMsg = 'خطأ أثناء استخدام أسلوب النقل بالتقسيم.';
                        if(lang == 'ru') myMsg = 'Ошибка при использовании переноса раздельным методом.';
                        if(lang == 'kp') myMsg = '분할 방법으로 전송을 사용하는 동안 오류가 발생했습니다.';
                        if(lang == 'en') myMsg = 'Error while using transfer by split method.';
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: myMsg,
                            text: error.message,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    });
                }
                else
                {
                    if(lang == 'ae') myMsg = 'مطلوب مبلغ تحويل أو مضاعف 50 أو لا يزيد عن 2000 أو تقسيم مبلغ PLEDGE المطلوب.';
                    if(lang == 'ru') myMsg = 'Требуемая сумма перевода или кратная 50 или не более 2000, или требуется разделить сумму PLEDGE.';
                    if(lang == 'kp') myMsg = '필요한 이체 금액 또는 50의 배수 또는 2000 이하 또는 분할 버스 금액이 필요합니다.';
                    if(lang == 'en') myMsg = 'Transfer amount required or multiple of 50 or not more than 2000 or split PLEDGE amount required.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        text: myMsg,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                    return false;
                }
            }
            else
            {
                if(lang == 'ae') myMsg = 'أدخل عنوان مستلم صالحًا أو حقل العنوان المطلوب.';
                if(lang == 'ru') myMsg = 'Введите действительный адрес получателя или обязательное поле адреса.';
                if(lang == 'kp') myMsg = '유효한 수신자 주소 또는 필수 주소 필드를 입력하십시오.';
                if(lang == 'en') myMsg = 'Enter a valid receiver address or address field required.';

                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: myMsg,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                return false;
            }
        });
    }

    if($('body').is('.withdrawPage'))
    {
        $(".withdrawBut").on("click", async function() {
            await MY_CONTRACT.methods.withdraw().send({from: userAddr, gasPrice: estimateGas, gas: gasLimit }, function(error, transactionHash){
                if(error)
                {
                    if(lang == 'ae') myMsg = 'خطأ أثناء سحب الطلب.';
                    if(lang == 'ru') myMsg = 'Ошибка при отзыве запроса.';
                    if(lang == 'kp') myMsg = '철회 요청 중 오류가 발생했습니다.';
                    if(lang == 'en') myMsg = 'Error while withdraw request.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        text: error,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }
                if(transactionHash)
                {
                    if(lang == 'ae') myMsg = 'تم تقديم طلب السحب بنجاح.';
                    if(lang == 'ru') myMsg = 'Запрос на вывод успешно отправлен.';
                    if(lang == 'kp') myMsg = '철회 요청이 성공적으로 제출되었습니다.';
                    if(lang == 'en') myMsg = 'Withdraw request submitted successfully.';

                    if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                    if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                    if(lang == 'kp') myMsg1 = '거래 해시';
                    if(lang == 'en') myMsg1 = 'Your transaction hash';

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: myMsg,
                        text: `${myMsg1} \n ${transactionHash}`,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }
            })
            .catch((error) => {
                if(lang == 'ae') myMsg = 'خطأ أثناء سحب الطلب.';
                if(lang == 'ru') myMsg = 'Ошибка при отзыве запроса.';
                if(lang == 'kp') myMsg = '철회 요청 중 오류가 발생했습니다.';
                if(lang == 'en') myMsg = 'Error while withdraw request.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            });
            await sleep(2000).then(async function(){
                location.reload();
            })
            .catch((error) => {
                if(lang == 'ae') myMsg = 'خطأ أثناء سحب الطلب.';
                if(lang == 'ru') myMsg = 'Ошибка при отзыве запроса.';
                if(lang == 'kp') myMsg = '철회 요청 중 오류가 발생했습니다.';
                if(lang == 'en') myMsg = 'Error while withdraw request.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            });
        });
    }
    
    if($('body').is('.homePage'))
    {
        homePageInfo();
    }

    $(".contractAddress").on("click", function(){
        window.open(
            "https://polygonscan.com/address/" + MY_CONTRACT_ADDRESS +"#code",
            '_blank'
        );
    })
    
})();

const setRefLink = () => {
    // var inviteLink = window.location.protocol+"//"+window.location.host + getUrlRelativePath() + "?ref=" + userAddr;
    //var inviteLink = "https://sbnfly.com/dashboard?ref=" + userAddr;
    //var inviteLink = "http://localhost/sbn/reff/" + userAddr;
    var inviteLink = window.location.protocol+"//"+window.location.host + getUrlRelativePath() + "?ref=" + userAddr;
    $('.refLink').val(inviteLink)
    var myAddrShort = userAddr.substring(0,4) + "..." + userAddr.substring(userAddr.length - 4);
    $(".myAddr").text(myAddrShort);
}

const homePageInfo = async () => {
    luckPool = parseInt(await MY_CONTRACT.methods.luckPool().call())/1000000000000000000;
    $(".luckPool").text(luckPool.toFixed(2) + " $PLG");
    starPool = parseInt(await MY_CONTRACT.methods.starPool().call())/1000000000000000000;
    $(".starPool").text(starPool.toFixed(2) + " $PLG");
    topPool = parseInt(await MY_CONTRACT.methods.topPool().call())/1000000000000000000;
    $(".topPool").text(topPool.toFixed(2) + " $PLG");

    var stakeCount = parseInt(await MY_CONTRACT.methods.getStakersLength().call());
    var recycle = 10;
    if(stakeCount < recycle){
        recycle = stakeCount;
    }

    var index = 0;
    var userMap = new Map();
    for(var i = stakeCount; i > stakeCount - recycle; i--){
        var userLatestStake = await MY_CONTRACT.methods.stakers(i - 1).call();
        if(!userMap.has(userLatestStake)){
            userMap.set(userLatestStake, 0);
        }else{
           var val = userMap.get(userLatestStake);
           userMap.set(userLatestStake, val + 1);
        }
        var userCount = userMap.get(userLatestStake);
        var userLatestOrderNum = parseInt(await MY_CONTRACT.methods.getOrderLength(userLatestStake).call());
        var {amount} = await MY_CONTRACT.methods.orderInfos(userLatestStake, userLatestOrderNum - 1 - userCount).call();
        var latestAmount = parseInt(amount)/1000000000000000000;
        $(".latestStake").eq(index).text(userLatestStake);
        $(".latestAmount").eq(index).text(latestAmount.toFixed(2) + " $PLG");
        index++;
    }
}

const updateCommonInfo = async () => {
    var short_contract_address = MY_CONTRACT_ADDRESS.substring(0, 8) + "..." + MY_CONTRACT_ADDRESS.substring(MY_CONTRACT_ADDRESS.length - 8);
    $(".contractAddress").text(short_contract_address);
    var startTime = parseInt(await MY_CONTRACT.methods.startTime().call()) * 1000;
    var nowTime = (new Date).getTime();
    var runTime = formatDate(startTime, nowTime)
    $(".runTime").text(runTime)
    var orderLength = parseInt(await MY_CONTRACT.methods.getOrderLength(userAddr).call());
    if(orderLength > 0){
        var {unfreeze} = await MY_CONTRACT.methods.orderInfos(userAddr, orderLength - 1).call();
        var unfreezeTS = parseInt(unfreeze)*1000
        var stakeCountDown = formatDate(nowTime, unfreezeTS)
        $(".stakeCountDown").text(stakeCountDown);
    }else{
        $(".stakeCountDown").text("00:00:00");
    }
    luckPool = parseInt(await MY_CONTRACT.methods.luckPool().call())/1000000000000000000;
    $(".luckPool").text(luckPool.toFixed(2) + " $PLG");
    starPool = parseInt(await MY_CONTRACT.methods.starPool().call())/1000000000000000000;
    $(".starPool").text(starPool.toFixed(2) + " $PLG");
    topPool = parseInt(await MY_CONTRACT.methods.topPool().call())/1000000000000000000;
    $(".topPool").text(topPool.toFixed(2) + " $PLG");
    var stakeCount = parseInt(await MY_CONTRACT.methods.getStakersLength().call());
    var recycle = 10;
    if(stakeCount < recycle){
        recycle = stakeCount;
    }

    var index = 0;
    var userMap = new Map();
    for(var i = stakeCount; i > stakeCount - recycle; i--){
        var userLatestStake = await MY_CONTRACT.methods.stakers(i - 1).call();
        if(!userMap.has(userLatestStake)){
            userMap.set(userLatestStake, 0);
        }else{
           var val = userMap.get(userLatestStake);
           userMap.set(userLatestStake, val + 1);
        }
        var userCount = userMap.get(userLatestStake);
        var userLatestOrderNum = parseInt(await MY_CONTRACT.methods.getOrderLength(userLatestStake).call());
        var {amount, start} = await MY_CONTRACT.methods.orderInfos(userLatestStake, userLatestOrderNum - 1 - userCount).call();
        var latestAmount = parseInt(amount)/1000000000000000000;
        $(".latestStake").eq(index).text(userLatestStake);
        $(".latestAmount").eq(index).text(latestAmount.toFixed(2) + " $PLG");
        var latestStart = getDate(parseInt(start) * 1000);
        $(".latestStakeTime").eq(index).text(latestStart);
        index++;
    }
}

const updateSysInfo = async () => {
    totalUser = parseInt(await MY_CONTRACT.methods.totalUser().call());    
    $(".totalUser").text(totalUser);
     var curDay = parseInt(await MY_CONTRACT.methods.getCurDay().call());
     var dayLuckLength = parseInt(await MY_CONTRACT.methods.getDayLuckLength(curDay).call());
     var checkCount = 10;
     if(dayLuckLength < 10){
         checkCount = dayLuckLength;
     }
     var luckUsers = [];
     var luckStakes = [];
     for( var i = dayLuckLength; i > dayLuckLength - checkCount; i--){
         var luckUser = await MY_CONTRACT.methods.dayLuckUsers(curDay, i - 1).call();
         luckUsers.push(luckUser)
         var luckStake = (parseInt(await MY_CONTRACT.methods.dayLuckUsersStake(curDay, i - 1).call())/1000000000000000000).toFixed(2);
         luckStakes.push(luckStake);
     }

     for(var i = 0; i < checkCount; i++){
         var luckUser = luckUsers[i];
         $(".luckUser").eq(i).text(luckUser);
         $(".luckStake").eq(i).text(luckStakes[i]);
     }

     for(var i = 0; i < 3; i++){
         var dayTopUser = await MY_CONTRACT.methods.dayTopUsers(curDay, i).call();
         if(dayTopUser != ZERO_ADDR) {
             $(".dayTopUser").eq(i).text(dayTopUser);
         }else{
             break;
         }
     }
}

const lotteryCountdown = async () => {
    lastDistribute = parseInt(await MY_CONTRACT.methods.lastDistribute().call());
    setInterval(async() => {
        var nowTime = (new Date).getTime() / 1000;
        var disTime = lastDistribute + perDay;
        var leftTime = disTime - nowTime;
        if(leftTime > 0)
        {
            var leftHours = Math.floor(leftTime/perHour);
            var hourStart;
            var hourEnd;
            if(leftHours >= 10)
            {
                hourStart = Math.floor(leftHours/10);
                hourEnd = Math.floor(leftHours%10);
            }
            else
            {
                hourStart = 0;
                hourEnd = leftHours;
            }

            var leftMinutes = Math.floor(leftTime%perHour/perMinute);
            var minuteStart;
            var minuteEnd;
            if(leftMinutes >= 10){
                minuteStart = Math.floor(leftMinutes/10);
                minuteEnd = Math.floor(leftMinutes%10);
            }else{
                minuteStart = 0;
                minuteEnd = leftMinutes;
            }
            var leftSeconds = Math.floor(leftTime%perHour%perMinute);
            var secondStart;
            var secondEnd;
            if(leftSeconds >= 10)
            {
                secondStart = Math.floor(leftSeconds/10);
                secondEnd = Math.floor(leftSeconds%10);
            }
            else
            {
                secondStart = 0;
                secondEnd = leftSeconds;
            }
            $(".hourStart").text(hourStart)
            $(".hourEnd").text(hourEnd)
            $(".minuteStart").text(minuteStart)
            $(".minuteEnd").text(minuteEnd)
            $(".secondStart").text(secondStart)
            $(".secondEnd").text(secondEnd)
          
        }
        else 
        {
            if(lang == 'ae') myMsg = 'في تَقَدم';
            if(lang == 'ru') myMsg = 'В ходе выполнения';
            if(lang == 'kp') myMsg = '진행 중';
            if(lang == 'en') myMsg = 'In Progress';
            var statusNow = myMsg;
            $(".wrap").text(statusNow)
        }
    }, 1000)
}


const updateRewardInfo =  async () => {
    var {capitals, statics, directs, level4Released, level5Left, level5Released, level5Freezed, star, luck, top} = await MY_CONTRACT.methods.rewardInfo(userAddr).call();
    var {level3Released} = await MY_CONTRACT.methods.rewardInfoFor3rdLevel(userAddr).call();
    
    let capamount = web3.utils.BN(web3.utils.fromWei(capitals.toString(), 'ether')).toString();
    var capital = parseFloat(capamount);
    $(".unfreezed").text(capital.toFixed(2) + " $PLG");

    // var orderLength = parseInt(await MY_CONTRACT.methods.getOrderLength(userAddr).call());
    // var timeNow = (new Date()).getTime() / 1000
    // var totalStatic = parseInt(statics);
    // for(var i = 0; i < orderLength; i++){
    //     var {amount, start, unfreeze, isUnfreezed} = await MY_CONTRACT.methods.orderInfos(userAddr, i).call();
    //     var formatAmt = parseInt(amount);
    //     var formatStart = parseInt(start); 
    //     var formatUnfreeze = parseInt(unfreeze);
        
    //     if(!isUnfreezed){
    //         if(timeNow > formatUnfreeze){
    //             totalStatic = totalStatic + (formatAmt * 150 / 1000)
    //         }else{
    //             let dayPassed = (timeNow - formatStart) / timeStep;
    //             if(dayPassed > 10){
    //                 totalStatic = totalStatic + (formatAmt * 150 / 1000)
    //             }else{
    //                 totalStatic = totalStatic + (formatAmt * 15 * dayPassed / 1000);
    //             }
    //         }
    //     }
    // }
    //var totalStatic = parseInt(totalStatic);
    //console.log(web3.utils.BN(web3.utils.fromWei(totalStatic.toString(), 'ether')).toString());
    //console.log(web3.utils.fromWei(totalStatic.toString(), 'ether') * 0.75);
    var staticWithdrawable = parseFloat(web3.utils.fromWei(statics.toString(), 'ether') * 0.75);        
    $(".staticReward").text(staticWithdrawable.toFixed(2) + " $PLG");

    var directReward = parseFloat(web3.utils.fromWei(directs.toString()) * 0.75);
    $(".directReward").text(directReward.toFixed(2) + " $PLG");
    
    var level3Reward = parseFloat(web3.utils.fromWei(level3Released.toString()) * 0.75);
    $(".level3Reward").text(level3Reward.toFixed(2) + " $PLG");

    var level4Reward = parseFloat(web3.utils.fromWei(level4Released.toString()) * 0.75);
    $(".level4Reward").text(level4Reward.toFixed(2) + " $PLG");

    var level5Left = parseFloat(web3.utils.fromWei(level5Left.toString()) * 0.75);
    $(".level5Left").text(level5Left.toFixed(2) + " $PLG");

    var level5Freezed = parseFloat(web3.utils.fromWei(level5Freezed.toString()) * 0.75);
    $(".level5Freezed").text(level5Freezed.toFixed(2) + " $PLG");

    var level5Reward = parseFloat(web3.utils.fromWei(level5Released.toString()) * 0.75);
    $(".level5Reward").text(level5Reward.toFixed(2) + " $PLG");

    var starReward = parseFloat(web3.utils.fromWei(star.toString()) * 0.75);
    $(".starReward").text(starReward.toFixed(2) + " $PLG");

    var luckReward = parseFloat(web3.utils.fromWei(luck.toString()) * 0.75);
    $(".luckReward").text(luckReward.toFixed(2) + " $PLG");

    var topReward = parseFloat(web3.utils.fromWei(top.toString()) * 0.75);
    $(".topReward").text(topReward.toFixed(2) + " $PLG");

    var totalReward = capital+staticWithdrawable+directReward+level3Reward+level4Reward+level5Reward+starReward+luckReward+topReward;
    $(".totalReward").text(totalReward.toFixed(2) + " $PLG");
}

const isRegisteredCheck = async () => {
    var { referrer } = await MY_CONTRACT.methods.userInfo(userAddr).call();
    refer = web3.utils.toHex(referrer);
    if(refer == ZERO_ADDR)
    {
        $('#registerModal').modal('show').fadeIn(100);
        
        refer = getQueryVariable("ref");
        
        if(refer == '')
        {
            if(lang == 'ae') myMsg = 'هذا هو المرجع الصماء.';
            if(lang == 'ru') myMsg = 'Это реферер по умолчанию.';
            if(lang == 'kp') myMsg = '이것은 기본 참조자입니다.';
            if(lang == 'en') myMsg = 'Congratulations! You are joining under root ID.';
            messageJoin = '<h4 class="text-danger">'+myMsg+'</h3>';
            refer = REFERER_DEFAULT;
        }
        else
        {
            var { maxStake } = await MY_CONTRACT.methods.userInfo(refer).call();
            minStake = web3.utils.fromWei(maxStake, 'ether');
            if(parseInt(minStake) < 50)
            {
                if(lang == 'ae') myMsg = 'هذا هو عنوان محفظة الإحالة غير النشط.';
                if(lang == 'ru') myMsg = 'Это неактивный адрес реферального кошелька.';
                if(lang == 'kp') myMsg = '비활성 참조 지갑 주소입니다.';
                if(lang == 'en') myMsg = 'This is inactive refer wallet address.';
                messageJoin = '<h4 class="text-danger">'+myMsg+'</h4>';
            }
            else
            {
                if(lang == 'ae') myMsg = 'هذا هو المُحيل الخاص بك.';
                if(lang == 'ru') myMsg = 'Это ваш реферал.';
                if(lang == 'kp') myMsg = '추천인입니다.';
                if(lang == 'en') myMsg = 'This is your Upline.';
                messageJoin = '<h4 class="text-success">'+myMsg+'</h4>';
            }
        }
        
        $(".messageJoin").html(messageJoin);
        $(".joinRefer").text(refer);
    }
}

var splitAmt = 0;
const updateUserInfo = async () => {
    maticBal = parseFloat(web3.utils.fromWei(await web3.eth.getBalance(userAddr)));
    $(".maticBal").text(maticBal.toFixed(2));
    
    plgBal = parseInt(await PLG_CONTRACT.methods.balanceOf(userAddr).call())/1000000000000000000;
    $(".plgBal").text(plgBal);

    var {level, maxStake, totalStake, totalRevenue} = await MY_CONTRACT.methods.userInfo(userAddr).call();
    
    var totalWithdrawn = parseFloat(web3.utils.fromWei(totalRevenue.toString(), 'ether'));
    $(".withdrawn").text(totalWithdrawn.toFixed(2) + " $PLG");
    // $(".withdrawn").text(totalWithdrawn);
    
    var referShort = refer.substring(0,8) + "..." + refer.substring(userAddr.length - 8);
    $(".referAddr").text(referShort);
    userMaxStake = parseInt(maxStake)/1000000000000000000;
    splitAmt = (parseInt(await MY_CONTRACT.methods.getCurSplit(userAddr).call())/1000000000000000000);
    $(".freezingAmt").val(splitAmt);
    totalStake = parseInt(totalStake);
    if(totalStake > 0){
        $(".dMention").css({"display":"none"})
        $(".stakeFreezing").css({"background":"gray"})
    }
    else
    {
        $(".tMention").css({"display":"none"})
        $(".transferFreezing").css({"background":"gray"})
    }
    level = parseInt(level);
    for(i = 0; i < level; i++){
        
         if(i== 0) {
                $(".level").eq(i).html('<img src="assets/img/content/s1.png" alt="rank1" class="brand-image">');
            }
           if(i== 1) {
                $(".level").eq(i).html('<img src="assets/images/s2.png" alt="rank2" class="brand-image" style="opacity: .8">');
            }
            
            if(i== 2) {
                $(".level").eq(i).html('<img src="assets/images/s3.png" alt="rank3" class="brand-image" style="opacity: .8">');
            }
            if(i== 3) {
                $(".level").eq(i).html('<img src="assets/images/s4.png" alt="rank4" class="brand-image" style="opacity: .8">');
            }
            if(i== 4) {
                $(".level").eq(i).html('<img src="assets/images/s5.png" alt="rank5" class="brand-image" style="opacity: .8">');
            }
       
    }
}

const isApprove = async (to) => {
    let res = await PLG_CONTRACT.methods.allowance(userAddr, to).call();
    var allowanceAmount = (res);
    if(allowanceAmount > 5000e18) {
        return true;
    }
    else
    {
        return false;
    }
}

const setApprove = async (to) => {

    var amount = '1157920892373161954235709850086879078532';
    await PLG_CONTRACT.methods.approve(to, amount).estimateGas({from: userAddr}).then(async function(gasAmount){
        if(gasAmount >= 8000000)
        {
            if(lang == 'ae') myMsg = 'طريقة نفد الغاز.';
            if(lang == 'ru') myMsg = 'У метода закончился газ.';
            if(lang == 'kp') myMsg = '메서드에 가스가 부족했습니다.';
            if(lang == 'en') myMsg = 'Method ran out of gas.';
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: myMsg,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
            return false;
        }
        else
        {
            //gasLimit = web3.utils.toHex(web3.utils.fromWei(gasAmount, 'gwei'));
            estimateGas = web3.utils.toHex(web3.utils.toWei('300', 'gwei'));     
            await PLG_CONTRACT.methods.approve(to, amount).send({ from: userAddr, gasPrice: estimateGas, gas: gasAmount }, function(error, transactionHash){
                if(error)
                {
                    if(lang == 'ae') myMsg = 'خطأ أثناء الموافقة على PLEDGE.';
                    if(lang == 'ru') myMsg = 'Ошибка при утверждении PLEDGE.';
                    if(lang == 'kp') myMsg = '버스를 승인하는 동안 오류가 발생했습니다.';
                    if(lang == 'en') myMsg = 'Error while approve PLEDGE.';
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: myMsg,
                        text: error.message,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }
                if(transactionHash)
                {
                    if(lang == 'ae') myMsg = 'تمت الموافقة على PLEDGE بنجاح.';
                    if(lang == 'ru') myMsg = 'Буд одобрен успешно.';
                    if(lang == 'kp') myMsg = '버스가 성공적으로 승인되었습니다.';
                    if(lang == 'en') myMsg = 'PLEDGE approved successfully.';

                    if(lang == 'ae') myMsg1 = 'تجزئة معاملتك';
                    if(lang == 'ru') myMsg1 = 'Хэш вашей транзакции';
                    if(lang == 'kp') myMsg1 = '거래 해시';
                    if(lang == 'en') myMsg1 = 'Your transaction hash';
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: myMsg,
                        text: `${myMsg1} \n ${transactionHash}`,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                }        
            })
            .catch((error) => {
                if(lang == 'ae') myMsg = 'خطأ أثناء الموافقة على PLEDGE.';
                if(lang == 'ru') myMsg = 'Ошибка при утверждении PLEDGE.';
                if(lang == 'kp') myMsg = '버스를 승인하는 동안 오류가 발생했습니다.';
                if(lang == 'en') myMsg = 'Error while approve PLEDGE.';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: myMsg,
                    text: error.message,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            });
        }
    });
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const formatDate = (startTime, endTime) => {
    var formatTime;
    if(startTime < endTime){
        var perDay = 24 * 60 * 60 * 1000; 
        var perHour = 60 * 60 * 1000;
        var perMinute = 60 * 1000;
        var compareTime = endTime - startTime;
        day = Math.floor(compareTime / perDay);
        var hours =Math.floor(compareTime % perDay / perHour);
        var miniutes = Math.floor(compareTime % perDay % perHour / perMinute);
        if(day < 10){
            day = "0" + day
        }

        if(hours < 10){
            hours = "0" + hours
        }

        if(miniutes < 10){
            miniutes = "0" + miniutes
        }
        formatTime = day + ":" + hours + ":" + miniutes;
    }else{
        formatTime = "00:00:00";
    }
    return formatTime;
}

const getDate = (timstamp) => {
    var date = new Date(timstamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var forMatDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return forMatDate
}

const getUrlRelativePath = () => {
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);
    if(relUrl.indexOf("?") != -1)
    {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

const getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

const updateOrders = async () => {
    updated = true
    var length = parseInt(await MY_CONTRACT.methods.getOrderLength(userAddr).call())
    for(i = length - 1; i >= 0; i--)
    {
        var {amount, start, unfreeze, isUnfreezed} = await MY_CONTRACT.methods.orderInfos(userAddr, i).call();
        var stakeHtml = "<tr>"
        var startTS = parseInt(start)*1000;
        var dAmt = web3.utils.fromWei(amount.toString(), 'ether');
        stakeHtml = stakeHtml + "<td><span class='DepC2 DepCZ1'>" + dAmt + " $PLG</span></td>";
        var startDate = getDate(startTS);
        stakeHtml = stakeHtml + "<td><span class='DepC3'>" + startDate + "</span></td>";
        var unfreezeTS = parseInt(unfreeze)*1000;
        var unfreezeDate = getDate(unfreezeTS);
        stakeHtml = stakeHtml + "<td><span class='DepC4'>" + unfreezeDate + "</span></td>";
        var income = (parseInt(web3.utils.fromWei(amount.toString(), 'ether')) * (150 / 1000));
        stakeHtml = stakeHtml + "<td><span class='DepC4 DepCZ2'>" + income + " $PLG</span></td>";
        var date = new Date();
        var timeNow = date.getTime()
        var status;
        var className = '';
        if(timeNow < unfreezeTS){
            if(lang == 'ae') myMsg = 'تجميد';
            if(lang == 'ru') myMsg = 'Замораживание';
            if(lang == 'kp') myMsg = '동결';
            if(lang == 'en') myMsg = 'Freezing';
            status = myMsg;
            className = 'text-primary';
        }
        else
        {
            if(isUnfreezed)
            {
                if(lang == 'ae') myMsg = 'مكتمل';
                if(lang == 'ru') myMsg = 'Завершенный';
                if(lang == 'kp') myMsg = '완전한';
                if(lang == 'en') myMsg = 'Completed';
                status = myMsg;
                className = 'text-success';

            }
            else
            {
                if(lang == 'ae') myMsg = 'غير مقيد';
                if(lang == 'ru') myMsg = 'несвязанный';
                if(lang == 'kp') myMsg = '언본드';
                if(lang == 'en') myMsg = 'Unbonded';
                status = myMsg;
                className = 'text-warning';
            }
        }
        stakeHtml = stakeHtml + "<td><b><span class='" + className + "'>" + status + "</span></b></td>"
        stakeHtml = stakeHtml + "</tr>"
        $(".DepTab").append(stakeHtml)
    }
}


const updateTeamInfos =  async (from, to) => {
    updated = true;
    var teamStake = await MY_CONTRACT.methods.getTeamStake(userAddr).call()
    var maxDirectStake = parseInt(teamStake[0])/1000000000000000000;
    var otherDirectStake = parseInt(teamStake[1])/1000000000000000000;
    var teamTotalStake = parseInt(teamStake[2])/1000000000000000000;
    $(".maxDirectStake").text(maxDirectStake.toFixed(2) + " $PLG")
    $(".otherDirectStake").text(otherDirectStake.toFixed(2) + " $PLG")
    $(".totalTeamStake").text(teamTotalStake.toFixed(2) + " $PLG")

    var {teamNum} = await MY_CONTRACT.methods.userInfo(userAddr).call();
    $(".totalInvited").text(teamNum)

    var totalInvited = 0;
    var totalActive = 0;
    var teamEachStake = new Array(20).fill(0);
    for(var i = from; i < to; i++){
        var inviteAmount =parseInt(await MY_CONTRACT.methods.getTeamUsersLength(userAddr, i).call());
        if(inviteAmount > 0){
            for(var j = 0; j < inviteAmount; j++){
                var inviteUserAddr = await MY_CONTRACT.methods.teamUsers(userAddr, i, j).call();
                var {start, level, totalStake, teamTotalStake} = await MY_CONTRACT.methods.userInfo(inviteUserAddr).call();
                var stakeHtml = "<tr>";
                
                var iAddr = inviteUserAddr;
                var iAddrShort = inviteUserAddr.substring(0, 4) +"..."+ inviteUserAddr.substring(inviteUserAddr.length-4);
                stakeHtml = stakeHtml + "<td><span class='DepC7'>" + iAddrShort + "</span></td>";
                
                var iLevel = "L" + level;
                stakeHtml = stakeHtml + "<td><span class='DepC3'>" + iLevel + "</span></td>";
                
                var layer = i + 1;
                stakeHtml = stakeHtml + "<td><span class='DepC3'>" + layer + "</span></td>";
                
                if(lang == 'ae') myMsg = 'غير نشط';
                if(lang == 'ru') myMsg = 'Неактивный';
                if(lang == 'kp') myMsg = '비활성';
                if(lang == 'en') myMsg = 'InActive';
                
                var iStatus = myMsg;
                
                var iTotalStake = parseInt(totalStake);
                if(iTotalStake > 0)
                {
                    if(lang == 'ae') myMsg = 'نشط';
                    if(lang == 'ru') myMsg = 'Активировано';
                    if(lang == 'kp') myMsg = '활성';
                    if(lang == 'en') myMsg = 'Activated';
                    iStatus = myMsg;
                    totalActive = totalActive + 1;
                }

                stakeHtml = stakeHtml + "<td><span class='DepC2'>" + iStatus + "</span></td>";
                
                var iStartTime = parseInt(start) * 1000;
                var iTime = getDate(iStartTime);
                stakeHtml = stakeHtml + "<td><span class='DepC4'>" + iTime + "</span></td>";
                stakeHtml = stakeHtml + "</tr>";
                $(".DepTab2").append(stakeHtml);
                
                totalInvited = totalInvited + 1;
                var totalUnActived = totalInvited - totalActive;
                var forMatTotalStake = (parseInt(totalStake) / 1000000000000000000);
                teamEachStake[i] = teamEachStake[i] + forMatTotalStake;
            }
        }
        else
        {
            break;
        }
    }

    $(".totalActive").text(totalActive);
    $(".totalUnActived").text(totalUnActived);

    var sevenToTen = 0;
    for(var i = 6; i < 10; i++){
        sevenToTen = sevenToTen + teamEachStake[i];
    }

    var elToTw = 0;
    for(var i = 10; i < 20; i++){
        elToTw = elToTw + teamEachStake[i];
    }

    for(var i = 0; i < 6; i++){
        $(".teamStake").eq(i).text(teamEachStake[i].toFixed(2));
        if(teamEachStake[i] > 0){
            var rate = parseFloat(teamEachStake[i] * 100 /teamTotalStake).toFixed(2);
            $(".rate").eq(i).text(rate);
        }
    }

    if(sevenToTen > 0){
        $(".teamStake").eq(6).text(sevenToTen);
        var rate = parseFloat(sevenToTen * 100 /teamTotalStake).toFixed(2);
        $(".rate").eq(6).text(rate);
    }

    if(elToTw > 0){
        $(".teamStake").eq(7).text(elToTw);
        var rate = parseFloat(elToTw * 100 /teamTotalStake).toFixed(2);
        $(".rate").eq(7).text(rate);
    }
    var inviteLevel = "Level";
}

const changeLanguage = (e, lang) => {
    e.preventDefault();
    localStorage.setItem("lang", lang);
    window.location.href = '/lang/'+lang+'/index';
    return true;
}
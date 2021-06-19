@extends('layouts.app')

@section('content')

<div class="indexContent" data-page_name="PLANS">
    <div class="maincontent">
        <div class="wrapinsidecontent">

            @if(Auth::user()->plan == 'free' && Auth::user()->api_status == null)

            <div class="alertan">

                <div class="agrid">

                    <img src="/img/infogray.png" srcset="/img/infogray@2x.png 2x,

                         /img/infogray@3x.png 3x" style="margin:0.6rem;">

                    <p>You have a free plan. <a href="/plans#planBottom">Click here to upgrade your plan.</a></p>

                </div>

            </div>

            @endif


            @if(Auth::user()->api_status == 'pending')

            <div class="alertan">

                <div class="agrid">

                    <img src="/img/infogray.png" srcset="/img/infogray@2x.png 2x,

                        /img/infogray@3x.png 3x" style="margin:0.6rem;">

                    <p>You have done an upgrade request to BASIC plan. It will be in pending status while the current payment in shopify is approved! Please try again!</a></p>

                </div>

            </div>

            @endif




            <div class="alertan level2 token-error" id="token-error" style="display:none">

                <div class="agrid">

                    <p><strong>Error!</strong> Invalid token.</p>

                </div>

            </div>





            <div class="alertan level2 token-success" id="token-success" style="display:none">

                <div class="agrid">

                    <p><strong>Success!</strong> Token successfully saved.</p>

                </div>

            </div>

            @if(Auth::user()->membership_token == '')

            <div class="colsplan2">
                <div class="titlecol">
                    <h2 class="plantitle gray">Enter your Invoice number to upgrade the app:</h2>
                    <p style="text-align: center;margin-top: 0;"><input type="text" id="txtToken" value="{{$token}}" placeholder="Enter invoice #">
                        <button id="btnSubmitToken">Activate</button>
                    </p>
                    <p><a href="#" class="tokenmshow" data-toggle="modal" data-target="#invmodal">Where do I find my invoice number?</a></p>
                </div>

                <div class="titlecol">
                    <h2 class="plantitle gray">Join GreenDropShip to get an invoice number. </h2>
                    <p><a class="buttonget" href="https://greendropship.com/membership-account/membership-checkout/?level=1" target="_blank">Join now</a></p>
                    <p><a href="#" class="tokenmshow" data-toggle="modal" data-target="#joinmodal">Why do I have to join GreenDropShip?</a></p>


                    <!-- Modal -->
                    <div class="modal fade" id="invmodal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                <div class="modal-body">
                                    <div class="tokentext" id="tokencopy">

                                        <p>
                                            Your invoice number is emailed to you after you join GreenDropShip. <br>
                                            Enter your invoice number to connect your GreenDropShip account to the app.

                                        </p>



                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <!-- Modal -->
                    <div class="modal fade" id="joinmodal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title"></h4>
                                    <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                <div class="modal-body">
                                    <div class="tokentext" id="tokencopy">
                                        <p>You need an annual GreenDropShip membership to upgrade the app.</p>
                                        <ol>
                                            <li>Join GreenDropShip by getting an annual membership.</li>
                                            <li>Your invoice number will be emailed to you.</li>
                                            <li>Copy and paste your invoice number here to connect your GreenDropShip account to the app.</li>
                                        </ol>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

            </div>

            @else

            <h2 class="plantitle">Hello {{Auth::user()->name}} <br> @if(Auth::user()->plan == 'free') <span style="color:black">Select the plan that you want to upgrade.</span>@endif
                </span></h2>

            @endif

            <div class="pricecols">

                <div>

                    <div class="headp">

                        <p><br></p>

                        <h3>Free</h3>

                    </div>

                    <div class="wrappc">
                        <p><strong>This plan allows you to view all products and create import lists.</strong></p>

                        <ul>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Browse GreenDropShip’s Complete Catalog of Products</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> View over 20,000 Brand Name Products</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Create Product Import Lists</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Automated Inventory Syncing</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Customer Support</li>
                        </ul>
                    </div>



                    <div class="buttonsp">

                        @if(Auth::user()->plan != 'free' && Auth::user()->membership_token != '')

                        <button data-plan="free" class="bgVO colorBL update">Downgrade</button>

                        @elseif(Auth::user()->plan == 'free' && Auth::user()->membership_token != '')

                        <div class="currentPlan">Current Plan</div>

                        @elseif(Auth::user()->membership_token == '')

                        <button data-plan="buttonFree" data-id='1' class="bgVO colorBL buttonDisabled">Downgrade</button>

                        <span class="answerBD1 spanAnswer" style="display:none">You must connect your GreenDropShip account to the app first.</span>

                        @endif

                    </div>



                </div>



                <div>

                    <div class="headp">

                        <p>Basic Plan</p>

                        <h3>$40.00/ month</h3>

                    </div>

                    <div class="wrappc">
                        <p><strong>This plan allows you to add products to your store and process up to 100 orders a month.</strong></p>
                        <ul>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Browse GreenDropShip’s Complete Catalog of Products</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Import Unlimited Products into your Shopify Store</li>
                            <!-- <li><i class="fa fa-check" aria-hidden="true"></i> Bulk Importing</li> -->
                            <li><i class="fa fa-check" aria-hidden="true"></i> Process Up to {{env('LIMIT_ORDERS')}} Orders a Month</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Automated Inventory Syncing</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Customer Support</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Automated Order Fulfillment</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> *Requires an annual GreenDropShip membership</li>
                        </ul>
                    </div>



                    <div class="buttonsp">

                        @if(Auth::user()->plan != 'basic' && Auth::user()->membership_token != '')

                        <button data-plan="basic" class="bgVO colorBL update">Upgrade</button>

                        @elseif(Auth::user()->plan == 'basic' && Auth::user()->membership_token != '')

                        <div class="currentPlan">Current Plan</div>

                        @elseif(Auth::user()->membership_token == '')

                        <button data-plan="buttonBasic" data-id='2' class="bgVO colorBL buttonDisabled">Upgrade</button>

                        <span class="answerBD2 spanAnswer" style="display:none">You must connect your GreenDropShip account to the app first.</span>

                        @endif

                    </div>



                </div>



                <div>

                    <div class="headp">

                        <p>Advanced Plan</p>

                        <h3>$100.00/ month </h3>

                    </div>

                    <div class="wrappc">
                        <p><strong>This solution for high volume sellers offers 50,000 monthly orders.</strong></p>
                        <ul>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Browse GreenDropShip’s Complete Catalog of Products</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Import Unlimited Products into your Shopify Store</li>
                            <!-- <li><i class="fa fa-check" aria-hidden="true"></i> Bulk Importing</li> -->
                            <li><i class="fa fa-check" aria-hidden="true"></i> Process Up to 50,000 Orders a Month</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Automated Inventory Syncing</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Customer Support</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> Automated Order Fulfillment</li>
                            <li><i class="fa fa-check" aria-hidden="true"></i> *Requires an annual GreenDropShip membership</li>
                        </ul>
                    </div>



                    <div class="buttonsp">

                        This plan will be available soon

                    </div>



                </div>

            </div>



        </div>



    </div>

</div>

</div>

<a id='planBottom'></a>

<script type="text/javascript">
    $(document).ready(function() {

        $('#btnSubmitToken').click(function() {
            $.post('{{url("/plans/save-token")}}', {
                "_token": "{{ csrf_token() }}",
                "token": $('#txtToken').val()
            }, function(data, status) {
                $('.token-error').hide();
                $('.token-success').show();
                window.location.href = "{{url('/plans')}}"
            }).fail(function(data) {
                $('.token-error').show();
                $('.token-success').hide();
            });
        });

        $('.update').click(function() {

            var plan = $(this).data('plan');
            if (plan == 'free') {
                if (confirm('Do you really want to downgrade this app?')) {
                    $.post('{{url("/plans/update")}}', {
                        "_token": "{{ csrf_token() }}",
                        'plan': plan
                    }, function(data) {
                        $('.token-error').hide();
                        window.location.href = "{{url('/plans/update-success')}}";
                    }).fail(function(data) {
                        $('.token-error').show();
                        window.location.href = "{{url('/plans/update-failure')}}";
                    });
                }
            } else {
                $.post('{{url("/plans/update")}}', {
                    "_token": "{{ csrf_token() }}",
                    'plan': plan
                }, function(data) {
                    $('.token-error').hide();
                    window.location.href = data;
                }).fail(function(data) {
                    $('.token-error').show();
                    window.location.href = "{{url('/plans/update-failure')}}";
                });
            }
        });

        $("div.alert button.close").click(function() {
            window.location.href = "{{url('/plans')}}"
        });

        $("#testingWH").click(function() {
            $.post('{{url("/customer-data-erasure-webhook")}}', {
                "_token": "{{ csrf_token() }}",
                "shop_id": 954889,
                "shop_domain": "merchant-gds2oscar.myshopify.com",
                "customer": {
                    "id": 191167,
                    "email": "john@email.com",
                    "phone": "555-625-1199"
                },
                "orders_to_redact": [299938, 280263, 220458]
            }, function(result) {
                console.log(result);
            });
        });





    });
</script>

@endsection

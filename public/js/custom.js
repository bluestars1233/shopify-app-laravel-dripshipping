var ajax_link = '/ajax'

$(document).ready(function () {
    //Page Name
    $('#pageName').html($('.indexContent').data('page_name'))

    //Left Menu
    $('.row-menu ul li').removeClass('active')
    $('.row-menu ul li[data-name="' + $('.indexContent').data('page_name') + '"]').addClass('active')

    /* DASHBOARD */
    $('.checklist-item input').click(function () {
        if ($(this).prop('checked')) {
            var value = 1
        } else {
            var value = 0
        }

        var parameters = {
            action: 'add_check',
            id_user: $('#inputId').val(),
            step: $(this).data('id'),
            value: value
        }

        $.getJSON(ajax_link, parameters, function (data) {})
    })

    /* SEARCH PAGE */
    $('.btn_import_list').click(function () {
        var parameters = {
            action: 'add_import_list',
            id_product: $(this).data('id')
        }

        $.getJSON(ajax_link, parameters, function (data) {
            $('.id_' + JSON.parse(data) + ' button.add').hide()
            $('.id_' + JSON.parse(data) + ' button.edit').show()
        })
    })

    /* PRODUCT DETAIL */
    $('.imgThumb').click(function () {
        $('.detailImage img').attr('src', $(this).data('img').replace('dc09e1c71e492175f875827bcbf6a37c', 'e793809b0880f758cc547e70c93ae203'))
    })

    /* IMPORT LIST */
    $('.import-tab').click(function () {
        var id_product = $(this)
            .parent()
            .parent()
            .data('id')
        var tabName = $(this).data('name')
        $('#product' + id_product)
            .find('.import-tab')
            .removeClass('active')
        $('#product' + id_product)
            .find('.import-tab label')
            .css('color', '#000000')
        $('#product' + id_product)
            .find('.import-content')
            .hide()
        $(this).addClass('active')
        $(this)
            .find('label')
            .css('color', '#89B73D')
        $('#product' + id_product)
            .find('.import-' + tabName)
            .show()
    })

    /* MY PRODUCTS */
    $('.mp-table-view button').click(function () {
        var id_product = $(this).data('id')
        $('.mp-product-detail').hide()
        $('.row' + id_product)
            .find('.mp-product-detail')
            .show()
    })

    $('.buttonDisabled').mouseover(function () {
        $('.answerBD' + $(this).data('id')).show()
    })

    $('.buttonDisabled').mouseout(function () {
        $('.answerBD' + $(this).data('id')).hide()
    })

    /* ADMIN ORDER DETAIL */
    $('#btnNotes').click(function () {
        var texto = $('textarea.ta' + $(this).data('id')).val()
        var parameters = {
            action: 'update_notes',
            id_order: $(this).data('id'),
            notes: ' ' + texto + '. '
        }

        $.getJSON(ajax_link, parameters, function (data) {
            alert('The notes have been updated successfully')
            location.reload()
        })
    })

    /* ADMIN USERS */
    $('.account').click(function () {
        if ($('.items').css('display') == 'none') $('.items').show();
        else $('.items').hide();
    });

    $('.fa-eye').click(function (event) {
        $(this).toggleClass('fa-eye fa-eye-slash');
        let input = $($(this).data("id"));
        if (input.attr("type") == "password") input.attr("type", "text");
        else input.attr("type", "password");
    })
    
    function passProgress(value) {
        let flag = false;
         if (value.indexOf(' ') > -1) {
            $('#password-error').text('Whitespace is not allowed.');
            $('#password-error').show();
        } else {
            if (value.length < 12) {
                if (value.length == 0) {
                    $('#password-error').text(empty_msg);
                    $('.progressbar').hide();
                    $('#password-error').show();
                } else {
                    $('#password-error').text(len_msg(12, value.length));
                    $('.progressbar').hide();
                    $('#password-error').show();
                }
            } else {
                let array = [];
                array.push(value.match(/[A-Z]/));
                array.push(value.match(/[a-z]/));
                array.push(value.match(/\d/));
                array.push(value.match(/[!#@$&_.-]/));
                let sum = 0;
                array.forEach(element => {
                    sum += element ? 1 : 0;
                });
                switch (sum) {
                    case 1: $('#password-error').hide(); $('#password-progress').val(25); $('.progressbar').show(); break;
                    case 2: $('#password-error').hide(); $('#password-progress').val(50); $('.progressbar').show(); break;
                    case 3: $('#password-error').hide(); $('#password-progress').val(75); $('.progressbar').show(); break;
                    case 4: $('#password-error').hide(); $('#password-progress').val(100); $('.progressbar').show(); break;
                    default: $('#password-progress').val(25); $('.progressbar').show(); break;
                }
                if (sum == 4 && value.length > 12) flag = true;
            }
        }
        return flag;
    }

    var empty_msg = '*Please fill out this field.';
    var len_msg = (minimum, length) => `*Plase lengthen this text to ${minimum} characters or more (you are currently using ${length} characters).`
    $('#btn-save-user').click(function (event) {
        //validation
        var flag = true;
        var reg = /([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?/;
        var name = $('#txt-user-name').val().trim();
        var email = $('#txt-email').val().trim();
        var password = $('#txt-password').val();
        var confirm_password = $('#txt-confirm-password').val();
        if (name.length < 3) {
            flag = false;
            if (name.length == 0) $('#name-error').text(empty_msg);
            else $('#name-error').text(len_msg(3, name.length));
            $('#name-error').show();
        } else $('#name-error').hide();

        if (!email.match(reg)) {
            flag = false;
            if (email.length == 0) $('#email-error').text(empty_msg);
            else $('#email-error').text('*Please input valid email.');
            $('#email-error').show();
        } else $('#email-error').hide();

        flag = passProgress(password);

        if (confirm_password.length == 0) {
            flag = false;
            $('#confirm-error').text(empty_msg);
            $('#confirm-error').show();
        } else {
            if ($('#txt-password').val() != $('#txt-confirm-password').val()) {
                flag = false;
                $('#confirm-error').text("*Confirm Password doesn't match");
                $('#confirm-error').show();
            } else $('#confirm-error').hide();
        }
        
        if (flag) {
            action = 'create-user';
            if (window.location.pathname == '/admin/profile') {
                action = 'update-user';
            }
            var parameters = {
                action: action,
                name: name,
                email: email.match(reg)[0],
                password: password,
            }
            $.getJSON(ajax_link, parameters, function (data) {
                $('#txt-password').val('');
                $('#txt-confirm-password').val('');
                if (data.id) {
                    $('#user_data').append(`<tr class="userdatarow">
                        <td data-label="USER NAME">
                            ${data.name}
                        </td>
                        <td data-label="EMAIL">
                            ${data.email}
                        </td>
                        <td data-label="ACTIVE">
                            <input type="checkbox" name="switch-button" id="switch-label${data.id}" class="switch-button__checkbox" checked>
                        </td>
                        <td>
                            <a href="/admin/merchants/show/${data.id}"><button class="view">View</button></a>
                        </td>
                    </tr>`)
                    $('#txt-user-name').val('');
                    $('#txt-email').val('');
                    $('#success-user').show();
                    setTimeout(() => {
                        $('#success-user').hide();
                    }, 3000);
                } else if (data.result) {
                    $('#success-profile').show();
                    $('.progressbar').hide();
                    setTimeout(() => {
                        $('#success-profile').hide();
                    }, 3000);
                } else {
                    $('.progressbar').hide();
                    $('#fail-user').show();
                    setTimeout(() => {
                        $('#fail-user').hide();
                    }, 3000);
                }
            })
        }
    });

    /* ADMIN PASSWORD */
    $('#new-password').keydown(function (event) {
        $('.progressbar').hide();
    });

    $('#txt-password').keydown(function (event) {
        $('.progressbar').hide();
    });

    $('#btn-save-password').click(function (event) {
        var flag = true;
        var old_password = $('#old-password').val();
        var new_password = $('#new-password').val();
        var confirm_password = $('#confirm-password').val();
        
        if (old_password.length == 0) {
            flag = false;
            $('#old-error').text(empty_msg);
            $('#old-error').show();
        } else $('#old-error').hide();

        flag = passProgress(new_password);

        if (confirm_password.length == 0) {
            flag = false;
            $('#confirm-error').text(empty_msg);
            $('#confirm-error').show();
        } else {
            if ($('#new-password').val() != $('#confirm-password').val()) {
                flag = false;
                $('#confirm-error').text("*Confirm Password doesn't match");
                $('#confirm-error').show();
            } else $('#confirm-error').hide();
        }

        if (flag) {
            var parameters = {
                action: 'admin-change-password',
                old_password: JSON.stringify(old_password),
                new_password: JSON.stringify(new_password)
            }
            $.getJSON(ajax_link, parameters, function (data) {
                if (data.result) {
                    $('#old-password').val('');
                    $('#new-password').val('');
                    $('#confirm-password').val('');
                    $('#success-password').show();
                    $('.progressbar').hide();
                    setTimeout(() => {
                        $('#success-password').hide();
                    }, 3000);
                } else {
                    $('.progressbar').hide();
                    $('#fail-password').show();
                    setTimeout(() => {
                        $('#fail-password').hide();
                    }, 3000);
                }
            })
        }
    });

    $('#mainlogo').click(function () {
        if($('#role').val() == 'admin') window.location.href = '/admin/dashboard';
        else window.location.href = '/';
    })
    function getAction() {
        var action = '';
        if (window.location.pathname == '/my-products') {
            action = 'my-products';
        }
        if (window.location.pathname == '/import-list') {
            action = 'import-list';
        }
        if (window.location.pathname == '/migrate-products') {
            action = 'migrate-products';
        }
        if (window.location.pathname == '/admin/orders') {
            action = 'admin-orders';
        }
        if (window.location.pathname == '/admin/merchants') {
            action = 'admin-merchants';
        }
        if (window.location.pathname == '/admin/users') {
            action = 'admin-users';
        }
        return action;
    }
    $('#page_size').change(function (event) {
        var parameters = {
            action: getAction(),
            page_size: event.target.value,
            page_number: 1
        }
        getData(parameters);
    })

    $('#next').click(function () {
        var total_count = $('#total_count').text();
        var page_size = $('#page_size').val();
        var page_number = $('#page_number').text().split('/')[0];
        var parameters = {
            action: getAction(),
            page_size: page_size,
            page_number: page_number * 1 + 1
        }
        if (total_count > page_size * page_number)
            getData(parameters);
    })

    $('#prev').click(function () {
        var parameters = {
            action: getAction(),
            page_size: $('#page_size').val(),
            page_number: $('#page_number').text().split('/')[0] - 1
        }
        if ($('#page_number').text().split('/')[0] > 1)
            getData(parameters);
    })

    function getData(parameters) {
        var flag = true;
        var action = getAction();
        if (action == 'admin-orders') {
            flag = orderSearchPermission();
            if (flag)
                Object.assign(parameters, {
                    from: $('#dateFrom').val(),
                    to: $('#dateTo').val(),
                    order_number: $('#idOrder').val().trim(),
                    merchant_name: $('#merchant').val().trim(),
                    payment_status: $('#paymentstatus').val(),
                    order_state: $('#orderstate').val(),
                });
        }
        if (action == 'admin-merchants') {
            Object.assign(parameters, {
                name: $('#merchant_name').val(),
                email: $('#merchant_email').val(),
                url: $('#merchant_url').val(),
                plan: $('#merchant_plan').val(),
                active: $('#merchant_active').val()
            })
        }
        if (action == 'admin-users') {
            Object.assign(parameters, {
                name: $('#user_name').val(),
                email: $('#user_email').val(),
                active: $('#user_active').val()
            })
        }
        if (flag)
            $.getJSON(ajax_link, parameters, function (res) {
                pagination(res);
                if (res.improds) {
                    showImportProducts(res.improds);
                } else if(res.prods) {
                    showMyProducts(res.prods);
                } else if(res.mig_products) {
                    showMigrateProducts(res.mig_products);
                } else if(res.order_list) {
                    showAdminOrders(res.order_list);
                } else if(res.merchants) {
                    showMerchants(res.merchants);
                } else if(res.users) {
                    showUsers(res.users);
                }
            })
    }

    function pagination (data) {
        if (data.page_number == '1') {
            $('#prev').prop('disabled', true);
        } else {
            $('#prev').prop('disabled', false);
        }
        if (data.page_number * data.page_size >= data.total_count) {
            $('#next').prop('disabled', true);
        } else {
            $('#next').prop('disabled', false);
        }
        $('#total_count').text(data.total_count);
        $('#total_page').text(Math.ceil(data.total_count / data.page_size));
        $('#page_number').text(data.page_number);
    }

    function showMyProducts (products) {
        $('.productdatarow').remove();
        $('.shoproductrow').remove();
        var str = '';
        products.forEach(product => {
            str += `<tr class="productdatarow">
                <td class="check">
                    <input type="checkbox" id="check-${product.id_shopify}" data-id="${product.id_my_products}" value="" class="checkbox">
                </td>
                <td class="pimage">
                    <div class="productphoto">
                        <img src="${product.image_url_75}">
                    </div>
                </td>
                <td data-label="PRODUCT NAME">
                    <a href="search-products/${product.id}" target="_blank" id="name-${product.id_shopify}">${product.name }</a>
                </td>
                <td data-label="COST GDS">
                    $${parseFloat(product.price).toFixed(2)}
                </td>
                <td data-label="PROFIT">
                    ${product.profit}%
                </td>
                <td data-label="RETAIL PRICE">
                    $${parseFloat(product.price * (100 + product.profit) / 100).toFixed(2)}
                </td>
                <td data-label="SKU">
                    ${product.sku}
                </td>
                <td>
                    <button class="btn-mp-view viewbutton vplist" data-id="${product.id}" id="view-${product.id_shopify}" data-view="#product${product.id}">View</button>
                </td>
                <td>
                    <button class="btn-mp-delete deletebutton" data-toggle="modal" data-target="#delete-product-modal" id="delete-${product.id_shopify}" data-myproductid="${product.id_shopify}"  data-name="${product.name}" data-sku="${product.sku}" data-img="${product.image_url_75}">Delete</button>                    <button class="deletebutton" id="deleting-${product.id_shopify}" data-myproductid="${product.id_shopify}" style="display: none;">Deleting...</button>
                    <button class="deletebutton" id="deleting-${product.id_shopify}" data-myproductid="${product.id_shopify}" style="display: none;">Deleting...</button>
                    <button class="deletebutton" id="deleted-${product.id_shopify}" data-myproductid="${product.id}" style="display: none;">Deleted</button>
                </td>
            </tr>
            <tr class="shoproductrow" id="product${product.id}">
                <td></td>
                <td colspan="8">
                    <div class="productlisthow">
                        <div class="productimage">
                            <img src="${product.image_url_285}">
                        </div>
                        <div class="productdata">
                            <h3>${product.name}</h3>
                            <p class="price">Price $${parseFloat(product.price * (100 + product.profit) / 100).toFixed(2)}</p>
                            <p>
                                Stock: ${product.stock}
                            </p>
                            <p>
                                Cost: $${parseFloat(product.price).toFixed(2)}
                            </p>
                            <p>
                                Profit: ${product.profit}%
                            </p>
                            <p>
                                Brand: ${product.brand}
                            </p>

                            <div class="pbuttons">
                                <button class="edit edit-product" id="edit-${product.id_shopify}" data-shopifyid="${product.id_shopify}">Edit in Shopify</button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`
        })
        $('#product_data').html(str)
    }

    function showImportProducts (data) {
        $('.productboxelement').remove()
        var str = '';
        data.products.forEach(product => {
            var image_str = '';
            var button_str = '';

            if (data.plan == 'free') {
                button_str += `<button data-toggle="modal" data-target="#upgrade-plans-modal" class='delete id="delete-${product.id_import_list}" data-id="${product.id_import_list}">Delete <img class="button-icon" src="img/delete.png" alt="Trash Can - Delete Icon"></button>
                    <button class='delete' id="deleting-${product.id_import_list}" style="display: none;" data-id="${product.id_import_list}">Deleting... <img class="button-icon" src="img/delete.png" alt="Trash Can - Delete Icon"></button>
                    <button data-toggle="modal" data-target="#upgrade-plans-modal" class='sendto btn-import-list-send btn-import-list-send-${product.id_import_list} verModal' data-id="${product.id_import_list}">Send to Shopify <img class="button-icon" src="img/edit.png" alt="Pencil in Square - Edit Icon"></button>
                    <button class="sendto sending btn-import-list-send3 btn-import-list-send3-${product.id_import_list}" data-shopifyid="0" style="display:none">Sending...</button>
                    <button class="sendto edit-in-shopify btn-import-list-send2 btn-import-list-send2-${product.id_import_list}" data-shopifyid="0" style="display:none">Edit in Shopify Store</button>`;
            } else {
                button_str += `<button class='delete btn-import-list-delete' data-toggle="modal" data-target="#delete-product-modal" id="delete-${product.id_import_list}" data-id="${product.id_import_list}"  data-name="${product.name}" data-sku="${product.sku}" data-img="${product.delete_image_url}">Delete <img class="button-icon" src="img/delete.png" alt="Trash Can - Delete Icon"></button>
                    <button class='delete' id="deleting-${product.id_import_list}" style="display: none;" data-id="${product.id_import_list}">Deleting... <img class="button-icon" src="img/delete.png" alt="Trash Can - Delete Icon"></button>
                    <button class='sendto btn-import-list-send btn-import-list-send-${product.id_import_list}' data-id="${product.id_import_list}">Send to Shopify <img class="button-icon" src="img/edit.png" alt="Pencil in Square - Edit Icon"></button>
                    <button class="sendto sending btn-import-list-send3 btn-import-list-send3-${product.id_import_list}" data-shopifyid="0" style="display:none">Sending...</button>
                    <button class="sendto edit-in-shopify btn-import-list-send2 btn-import-list-send2-${product.id_import_list}" data-shopifyid="0" style="display:none">Edit in Shopify Store</button>`;
            }
            product.images.forEach((image, i) => {
                image_str += `<div class="selectimage">
                    <div class="imagewrap">
                        <img class="img${product.id_import_list}-${i}" src="${image}">
                    </div>
                    <div class="checkim">
                        <input type="checkbox" class="chk-img${product.id_import_list}" data-index="${i}" value="" checked="checked">
                    </div>
                </div>`;
            });
            str += `<div class="productboxelement import-product" id="product${product.id_import_list}" data-id="${product.id_import_list}">
                <h2>${product.name}</h2>
                <div class="producttabs">
                    <div class="headertabs">
                        <div class="checkt">
                            <input type="checkbox" id="check-${product.id_import_list}" class="checkbox" style="display: block;">
                        </div>
                        <div class="tabs">

                            <a href=".tab-1" class="thetab active"> Product </a>
                            <a href=".tab-2" class="thetab"> Description </a>
                            <a href=".tab-3" class="thetab"> Pricing </a>
                            <a href=".tab-4" class="thetab"> Images </a>

                        </div>
                        <div class="buttons import-actions">
                            ${button_str}
                        </div>
                    </div>
                    <div class="contenttabs">
                        <div class="tab-1 wpadding tabcontent active">
                            <div class="productgrid">
                                <div>
                                    <div class="imagewrap">
                                        <img src='${product.image_url}'>
                                    </div>
                                </div>
                                <div>
                                    <h3>
                                        ${product.name}
                                    </h3>
                                    <div class="editform">
                                        <div class="full">
                                            <label for="">Change product name</label>
                                            <input type="text" id="name${product.id_import_list}" value='${product.name}'>
                                        </div>
                                        <div class="full">
                                            <label for="">Collection <span class="simple-tooltip" title="You can assign the product to a Collection in your Shopify store.">?</span></label>
                                            <input type="text" list="collection${product.id_import_list}" id="collections${product.id_import_list}" class="collection" data-id="${product.id_import_list}">
                                            <datalist id="collection${product.id_import_list}">
                                                <div id="collection_data"></div>
                                            </datalist>
                                            <span id="collection_error${product.id_import_list}" style="color:red; display:none;">One product have only one type.</span>
                                        </div>
                                        <div>
                                            <label for="">Type <span class="simple-tooltip" title="You can give this product a classification that will be saved in the 'Product Type' field in Shopify.">?</span></label>
                                            <input type="text" list="type${product.id_import_list}" id="types${product.id_import_list}" class="type" data-id="${product.id_import_list}">
                                            <datalist id="type${product.id_import_list}">
                                                <div id="type_data"></div>
                                            </datalist>
                                            <span id="type_error${product.id_import_list}" style="color:red; display:none;">One product have only one type.</span>
                                        </div>
                                        <div>
                                            <label for="">Tags <span class="simple-tooltip" title="You can create your own tags separated by commas.">?</span></label>
                                            <input type="text" list="tag${product.id_import_list}" id="tags${product.id_import_list}" class="tag" data-id="${product.id_import_list}">
                                            <datalist id="tag${product.id_import_list}">
                                                <div id="tag_data"></div>
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-2 tabcontent wpadding import-content import-description">
                            <textarea class="texteditor editor" name="" id="description${product.id_import_list}" cols="30" rows="10">${product.description}</textarea>
                        </div>
                        <div class="tab-3 tabcontent wpaddingtop">
                            <table class="greentable" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>
                                            SKU <span class="simple-tooltip" title="Do not change this SKU in your Shopify store.">?</span>
                                        </th>
                                        <th>
                                            HEIGHT
                                        </th>
                                        <th>
                                            WIDTH
                                        </th>
                                        <th>
                                            LENGTH
                                        </th>
                                        <th>
                                            WEIGHT
                                        </th>
                                        <th>
                                            COST
                                        </th>
                                        <th>
                                            PROFIT (%) <span class="simple-tooltip" title="Profit excludes shipping charges.">?</span>
                                        </th>
                                        <th>
                                            PRICE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="productdatarow">
                                        <td data-label="SKU" class="skutd">
                                            <input type="text" id="sku${product.id_import_list}" data-id="${product.id_import_list}" value="${product.sku}" disabled="disabled">
                                            <input type="hidden" id="upc${product.id_import_list}" value="${product.upc}" />
                                        </td>
                                        <td data-label="HEIGHT">
                                            ${product.ship_height}
                                        </td>
                                        <td data-label="WIDTH">
                                            ${product.ship_width}
                                        </td>
                                        <td data-label="LENGTH">
                                            ${product.ship_length}
                                        </td>
                                        <td data-label="WEIGHT" id="weight${product.id_import_list}">
                                            ${product.weight}
                                        </td>
                                        <td data-label="COST" class="w100">
                                            <div class="costgrid">
                                                $<span id="cost${product.id_import_list}" data-id="${product.id_import_list}">${parseFloat(product.price).toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td data-label="PROFIT (%) " class="w100">
                                            <span class="simple-tooltip" title="First tooltip">?</span>
                                            <div class="inpupercent">
                                                <input type="text" style="width: 50%; text-align:center;" class="box-profit" id="profit${product.id_import_list}" data-id="${product.id_import_list}" value="${data.profit}">%
                                            </div>
                                        </td>
                                        <td data-label="PRICE" class="w100">
                                            <div class="inputprice">
                                                $<input type="text" style="width: 50%; text-align:center;" class="box-price" id="price${product.id_import_list}" data-price="${product.price}" data-id="${product.id_import_list}" value="${parseFloat(product.price * (100 + data.profit) / 100).toFixed(2)}">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="tab-4 wpadding tabcontent">
                            <div class="imagesgrid">
                            ${image_str}
                            </div>
                        </div>
                    </div>

                </div>
            </div>`
        })

        str += `<script src="js/ckeditor/ckeditor.js"></script>
        <script type="text/javascript">
            $(".editor").each(function(index, ele) {
                CKEDITOR.replace($(ele).attr('id'), {});
            });
        </script>`
        $('#import-products').html(str);
    }

    $('.migration').click(function () {
        $.getJSON(ajax_link, {action: 'migration-count'}, function (res) {
            bringProducts(res);
        })
    })

    function bringProducts (data) {
        $.getJSON(ajax_link, data, function (res) {
            var params = {
                action: 'migration',
                index: res.index,
                location_id: res.location_id,
                total_count: res.total_count,
                count: res.count,
            }
            $('#migrating-progress').val(res.count/res.total_count*100);
            $('#percentage').text(`${parseInt(res.count/res.total_count*100)}%`);
            if (res.count == res.total_count) {
                pagination(res);
                showMigrationPage(res.mig_products);
            } else {
                bringProducts(params);
            }
        })
    }

    function showMigrationPage (data) {
        $('.migration').remove();
        var str = `<div style="display: flex;">
                    <input type="checkbox" id="check-all-mp" value="" data-mark="false">
                    <button class="btn-delete-products alldeletebutton">Delete</button>
                    <button class="btn-confirm-products allconfirmbutton">Confirm</button>
                    <button class="btn-set-profit profit">Set Profit</button>
                </div>
                <div class="pagesize">
                    <span>Show</span>
                    <select name="PageSize" id="page_size" class="page_size">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <table class="greentable" cellspacing="0">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>
                                Image
                            </th>
                            <th>
                                Product Name
                            </th>
                            <th>
                                Cost
                            </th>
                            <th>
                                Profit
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                SKU
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody id="product_data">`;
        str += migrateProducts(data);
        str += `</tbody></table>`;
        $('.migrate-products').html(str);
    }

    function showMigrateProducts (data) {
        $('.productdatarow').remove();
        var str = migrateProducts(data);
        $('#product_data').html(str);
    }

    function migrateProducts (products) {
        var str = '';
        products.forEach(product => {
            var payload = JSON.parse(product.payload);
            var button_str = '', profit_str = '';
            var cost_str = '';
            if (product.type == 'migration'){
                button_str = `<button class="btn-confirm-product confirmbutton mx-0" data-id="${product.id_shopify}" id="confirm-${product.id_shopify}">Confirm</button>
                                <button class="confirmbutton mx-0" data-id="${product.id_shopify}" id="confirming-${product.id_shopify}" style="display: none;">Confirming...</button>
                                <button class="confirmbutton mx-0" data-id="${product.id_shopify}" id="confirmed-${product.id_shopify}" style="display: none;">Confirmed</button>
                                <button class="btn-mp-delete deletebutton" id="delete-${product.id_shopify}" data-migproductid="${product.id_shopify}" style="display: none;">Delete</button>
                                <button class="deletebutton" id="deleting-${product.id_shopify}" data-migproductid="${product.id_shopify}" style="display: none;">Deleting...</button>
                                <button class="deletebutton" id="deleted-${product.id_shopify}" data-migproductid="${product.id_shopify}" style="display: none;">Deleted</button>`;
                profit_str = `<div id="profit">
                    <input type="text" style="text-align:center;" class="box-profit" id="profit-${product.id_shopify}" data-id="${product.id_shopify}" data-sku="${product.sku}" value="${parseFloat((product.price - product.cost) / product.cost * 100).toFixed(2)}">
                    %</div>`;
                cost_str = `<span id="cost-${product.id_shopify}">$${parseFloat(product.cost).toFixed(2)}</span>`;
            } else {
                button_str = `<button class="btn-mp-delete deletebutton" id="delete-${product.id_shopify}" data-migproductid="${product.id_shopify}">Delete</button>
                                <button class="deletebutton" id="deleting-${product.id_shopify}" data-migproductid="${product.id_shopify}" style="display: none;">Deleting...</button>
                                <button class="deletebutton" id="deleted-${product.id_shopify}" data-migproductid="${product.id_shopify}" style="display: none;">Deleted</button>`;
            }

            str += `<tr class="productdatarow">
                <td class="check">
                    <input type="checkbox" id="check-${ product.id_shopify }" data-id="${ product.id_shopify }" value="" class="checkbox">
                </td>
                <td class="pimage">
                    <div class="productphoto">
                        <img src="${payload.image_url}">
                    </div>
                </td>
                <td data-label="PRODUCT NAME">
                    ${ payload.name }
                </td>
                <td data-label="COST GDS">
                    ${cost_str}
                </td>
                <td data-label="PROFIT">
                    ${profit_str}
                </td>
                <td data-label="RETAIL PRICE">
                    <span id="price-${product.id_shopify}">$${parseFloat(product.price).toFixed(2)}</span>
                </td>
                <td data-label="SKU">
                    ${product.sku}
                </td>
                <td>
                    ${button_str}
                </td>
            </tr>`;
        });
        return str;
    }

    $("#search").click(function(e) {
        var flag = orderSearchPermission();
        if (flag) {
            var parameters = {
                action: getAction(),
                page_size: $('#page_size').val(),
                page_number: 1,
                from: $('#dateFrom').val(),
                to: $('#dateTo').val(),
                order_number: $('#idOrder').val().trim(),
                merchant_name: $('#merchant').val().trim(),
                payment_status: $('#paymentstatus').val(),
                order_state: $('#orderstate').val()
            }
            $.getJSON(ajax_link, parameters, function(res) {
                pagination(res);
                showAdminOrders(res.order_list);
            });
        }

    });

    function orderSearchPermission() {
        var from = $('#dateFrom').val();
        var to = $('#dateTo').val();
        var order_number = $('#idOrder').val().trim();
        var merchant_name = $('#merchant').val().trim();
        var payment_status = $('#paymentstatus').val();
        var order_state = $('#orderstate').val();
        var flag = true;
        if (from != '' && to != '')
            if (moment(from).isAfter(moment(to).format('YYYY-MM-DD'))) {
                flag = false;
                alert('Invalid date range.');
            }
        return flag;
    }

    function showAdminOrders (orders) {
        var str = '';
        orders.forEach(order => {
            str += `<tr class="orderrow">
                <td class="check">
                    <input type="checkbox" class="checkbox" data-id="${order.id}}">
                </td>
                <td data-label="ORDER #">
                    ${order.magento_order_id ? order.magento_order_id : ''}
                </td>
                <td data-label="DATE">
                    ${order.created_at}
                </td>
                <td data-label="TOTAL TO PAY">
                    $${parseFloat(order.total).toFixed(2)}
                </td>
                <td data-label="MERCHANT">
                    ${order.merchant_name}
                </td>
                <td>
                    <div class="buttonge" style="background-color: ${order.color1}">${order.status1}</div>
                </td>
                <td>
                    <div class="buttonge" style="background-color: ${order.color2}">${order.status2}</div>
                </td>
                <td>
                    <a href="/admin/orders/${order.id}">
                        <button class="view">View</button>
                    </a>
                </td>
            </tr>`;
        });
        $('.orderrow').remove();
        $('#order_data').html(str);
    }

    function showMerchants (merchants) {
        var str = '';
        merchants.forEach(merchant => {
            str += `<tr class="merchantrow">
                <td data-label="MERCHANT NAME">
                    ${merchant.name}
                </td>
                <td data-label="EMAIL">
                    ${merchant.email}
                </td>
                <td data-label="SHOPIFY URL">
                    ${merchant.shopify_url ? merchant.shopify_url : '' }
                </td>
                <td data-label="PLAN">
                    ${merchant.plan ? merchant.plan : ''}
                </td>
                <td data-label="ACTIVE">
                    <input type="checkbox" name="switch-button" id="switch-label${merchant.id}" data-merchantid="${merchant.id}" data-toggle="modal" data-target="#delete-product-modal" class="switch-button__checkbox change-status" ${merchant.active && 'checked'}>
                </td>
                <td class="btngroup">

                    <button class="view detail-merchants" data-merchantid="${merchant.id}">View</button>
                    <button class="payorder orders-customers" data-merchantid="${merchant.id}">Orders</button>

                </td>
            </tr>`;
        });
        $('.merchantrow').remove();
        $('#merchant_data').html(str);
    }

    $('#merchant_name').keypress(function(e) {
        if ($('#merchant_name').val().trim().length >= 2) {
            $.getJSON(ajax_link, {
                action: 'admin-merchant-name',
                name: $('#merchant_name').val().trim()
            }, function(res) {
                var str = '<div id="name_data">';
                res.names.forEach(name => {
                    str += `<option value="${name}">`;
                });
                str += '</div>';
                $('#name_data').remove();
                $('#names').html(str);
            })
        } else $('#name_data').remove();
    });
    $('#merchant_email').keypress(function(e) {
        if ($('#merchant_email').val().trim().length >= 2) {
            $.getJSON(ajax_link, {
                action: 'admin-merchant-email',
                email: $('#merchant_email').val().trim()
            }, function(res) {
                var str = '<div id="email_data">';
                res.emails.forEach(email => {
                    str += `<option value="${email}">`;
                });
                str += '</div>';
                $('#email_data').remove();
                $('#emails').html(str);
            })
        } else $('#email_data').remove();
    });
    $('#merchant_url').keypress(function(e) {
        if ($('#merchant_url').val().trim().length >= 2) {
            $.getJSON(ajax_link, {
                action: 'admin-merchant-url',
                url: $('#merchant_url').val().trim()
            }, function(res) {
                var str = '<div id="url_data">';
                res.urls.forEach(url => {
                    str += `<option value="${url}">`;
                });
                str += '</div>';
                $('#url_data').remove();
                $('#urls').html(str);
            })
        } else $('#url_data').remove();
    });
    $('#merchant_name').change(function(e) {
        getMerchantData();
    })
    $('#merchant_email').change(function(e) {
        getMerchantData();
    })
    $('#merchant_url').change(function(e) {
        getMerchantData();
    })
    $('#merchant_plan').change(function(e) {
        getMerchantData();
    })
    $('#merchant_active').change(function(e) {
        getMerchantData();
    })

    function getMerchantData() {
        var parameters = {
            action: getAction(),
            page_number: 1,
            page_size: $('#page_size').val()
        }
        getData(parameters);
    }

    function showUsers(users) {
        var str = '';
        users.forEach(user => {
            var active_str = `<input type="checkbox" name="switch-button" id="switch-label${user.id}" class="switch-button__checkbox">`;
            if (user.active) active_str = `<input type="checkbox" name="switch-button" id="switch-label${user.id}" class="switch-button__checkbox" checked>`;
            str += `<tr class="userdatarow">
                <td data-label="USER NAME">
                    ${user.name}
                </td>
                <td data-label="EMAIL">
                    ${user.email}
                </td>
                <td data-label="ACTIVE">
                    ${active_str}
                </td>
                <td>
                    <a href="/admin/merchants/show/${user.id}"><button class="view">View</button></a>
                </td>
            </tr>`;
        });
        $('.userdatarow').remove();
        $('#user_data').html(str);
    }

    $('#user_name').keypress(function(e) {
        if ($('#user_name').val().trim().length >= 2) {
            $.getJSON(ajax_link, {
                action: 'admin-user-name',
                name: $('#user_name').val().trim()
            }, function(res) {
                var str = '<div id="name_data">';
                res.names.forEach(name => {
                    str += `<option value="${name}">`;
                });
                str += '</div>';
                $('#name_data').remove();
                $('#names').html(str);
            })
        } else $('#name_data').remove();
    });

    $('#user_email').keypress(function(e) {
        if ($('#user_email').val().trim().length >= 2) {
            $.getJSON(ajax_link, {
                action: 'admin-user-email',
                email: $('#user_email').val().trim()
            }, function(res) {
                var str = '<div id="email_data">';
                res.emails.forEach(email => {
                    str += `<option value="${email}">`;
                });
                str += '</div>';
                $('#email_data').remove();
                $('#emails').html(str);
            })
        } else $('#email_data').remove();
    });

    $('#user_name').change(function(e) {
        if ($('#user_name').val().length == 0) $('name_data').remove();
        getMerchantData();
    });

    $('#user_email').change(function(e) {
        if ($('#user_email').val().length == 0) $('email_data').remove();
        getMerchantData();
    });

    $('#user_active').change(function(e) {
        getMerchantData();
    });

})

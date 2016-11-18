$(document).ready(function () {
    'use strict'
   
    // viewmodels
    class PurchaseOrderListViewModel {

        constructor() {
        }

        // purchaseOrder
        get purchaseOrderList() {
            return this._purchaseOrderList;
        }
        set purchaseOrderList(value) {
            this._purchaseOrderList = value;
        }

        addPurchaseOrder(purchaseOrder) {
            this.purchaseOrderList.push(purchaseOrder);
            renderPOView(purchaseOrder, this.purchaseOrderList.length);
        }

        removePurchaseOrder(idx) {
            $('#po-content>div[po-index=' + idx + ']').remove();
        }

        editPurchaseOrder(po) {
            
            $('div#' + po.id + '.supplier-field').text(' ' + po.suppliername);
            $('div#' + po.id + '.building-field').text(' ' + po.buildingdisplay);
            $('div#' + po.id + '.gross-field').text(' ' + po.gross);

        }

        fillPurchaseOrderList() {          
            let self = this;          
            $.getJSON('../../data/po-data.json', function (data) {
                let purchaseOrderList = data.purchaseorders;
                $.each(purchaseOrderList, function (idx) {
                    renderPOView(purchaseOrderList[idx], idx);
                });
                self.purchaseOrderList = purchaseOrderList;
            });               
        }
    }

    function renderPOView(purchaseOrder, idx)
    {
        $('#po-content').append(
                        '<div po-id="' + purchaseOrder.id + '" po-index="' + idx + '">'
                     + '<div></div>'
                     + '<div>'
                     + '<div style="float:left;">Supplier Name:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div><div class="supplier-field" id="' + purchaseOrder.id + '"> ' + purchaseOrder.suppliername + '</div>'
                     + '</div>'
                     + '<div>'
                     + '<div style="float:left;">Building Name:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div><div class="building-field" id="' + purchaseOrder.id + '"> ' + purchaseOrder.buildingdisplay + '</div>'
                     + '</div>'
                     + '<div>'
                     + '<div style="float:left;">Gross:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div><div class="gross-field" id="' + purchaseOrder.id + '"> ' + purchaseOrder.gross + '</div>'
                     + '</div>'
                     + '<div>'
                     + '<div class="btn btn-edit" po-id="' + purchaseOrder.id + '" po-index="' + idx + '">'
                     + '<img src="../../content/images/Edit Row-48.png" />'
                     + '<div>Edit PO</div>'
                     + '</div>'
                     + '<div class="btn btn-delete" po-id="' + purchaseOrder.id + '" po-index="' + idx + '">'
                     + '<img src="../../content/images/Delete Row-48.png" />'
                     + '<div>Delete PO</div>'
                     + '</div>'
                     + '</div>'
                     + '</div>'
                     );
    }

    //-------------------------------------------------------------

    // shared entities
    class PurchaseOrder {

        constructor(id, suppliername, buildingdisplay, gross) {
            this.id = id;
            this.suppliername = suppliername;
            this.buildingdisplay = buildingdisplay;
            this.gross = gross;
        }

        // id
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }


        // supplierName
        get suppliername() {
            return this._suppliername;
        }
        set suppliername(value) {
            this._suppliername = value;
        }

        // buildingName
        get buildingdisplay() {
            return this._buildingdisplay;
        }
        set buildingdisplay(value) {
            this._buildingdisplay = value;
        }

        // gross
        get gross() {
            return this._gross;
        }
        set gross(value) {
            this._gross = value;
        }
    }
   
    //-------------------------------------------------------------

    // presentation logic

    let poListVM = new PurchaseOrderListViewModel(),
        editMode,
        maxId = 4,
        modal = $('.modal'),
        currId = 0;
    poListVM.fillPurchaseOrderList();   

    $('#btn-add').on('click', function () {
        editMode = 'add';
        $('#suppliername').val(undefined);
        $('#buildingdisplay').val(undefined);
        $('#gross').val(undefined);
        modal.show();
    });

    setTimeout(function () {
        $.each(poListVM.purchaseOrderList, function (idx) {
            $('.btn-edit[po-index=' + idx + ']').on('click', function () {
                editMode = 'edit';
                currId = poListVM.purchaseOrderList[idx].id;
                $('.modal-header > h2').text('Edit PO');
                $('#suppliername').val(poListVM.purchaseOrderList[idx].suppliername);
                $('#buildingdisplay').val(poListVM.purchaseOrderList[idx].buildingdisplay);
                $('#gross').val(poListVM.purchaseOrderList[idx].gross);
                modal.show();
            });
            $('.btn-delete[po-index=' + idx + ']').on('click', function () {               
                poListVM.removePurchaseOrder(idx);
            });
        });
    }, 500)

    $('#btn-save').on('click', function () {
        let po = new PurchaseOrder(),
            isValid = true;
        po.suppliername = $('#suppliername').val();
        po.buildingdisplay= $('#buildingdisplay').val();
        po.gross = $('#gross').val();

        if (!po.suppliername) {
            alert("Please enter a supplier name");
            isValid = false;
        }
        else if (!po.buildingdisplay) {
            alert("Please enter a building name");
            isValid = false;
        }
        else if (!po.gross) {
            alert("Please enter a gross value");
            isValid = false;
        }

        if (isValid) {
            switch (editMode) {
                case 'add':
                    po.id = maxId + 1;
                    poListVM.addPurchaseOrder(po);
                    maxId = maxId + 1;
                    $('.btn-edit[po-id=' + po.id + ']').on('click', function () {
                        editMode = 'edit';
                        $('.modal-header > h2').text('Edit PO');
                        $('#suppliername').val($('div#' + po.id + '.supplier-field').text());
                        $('#buildingdisplay').val($('div#' + po.id + '.building-field').text());
                        $('#gross').val($('div#' + po.id + '.gross-field').text());
                        modal.show();
                    });
                    $('.btn-delete[po-id=' + po.id + ']').on('click', function () {
                        poListVM.removePurchaseOrder($(this).attr('po-index'));
                    });
                    modal.hide();
                    break;
                case 'edit':
                    po.id = currId;
                    poListVM.editPurchaseOrder(po);
                    modal.hide();
                    break;
                default:
                    alert("What are you trying to do?");
            }
        }       
    });

    $('#btn-cancel').on('click', function () {        
        modal.hide();
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.hide();
        }
    };

    //-------------------------------------------------------------
});
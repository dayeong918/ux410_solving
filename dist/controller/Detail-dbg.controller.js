sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter","sap/ui/model/json/JSONModel",
    "sap/viz/ui5/controls/VizFrame"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Detail", {
            onInit: function () {
                const oComponent = this.getOwnerComponent(),
                    oRouter = oComponent.getRouter();
                // 라우터 패턴이 일치할 때마다 _onRoutePatternMatched() 실행
                oRouter
                    .getRoute("RouteDetail")
                    .attachPatternMatched(this._onRoutePatternMatched, this);
                },

            _onRoutePatternMatched: function(oEvent){
                const oView = this.getView(),
                    oModel = oView.getModel(),
                    oArgs = oEvent.getParameter("arguments");

                    // 이벤트 객체에 파라미터 정보가 있음.
                let sBindPath = oModel.createKey("/Order_Details", {
                    OrderID: oArgs.OrderID, // 10248
                    ProductID: oArgs.ProductID //72
                });
                oView.bindElement(sBindPath); // View에다가 해당 데이터 세팅
                // 위 Binding 방법을 Element Binding 또는 Context Binding이라고 부릅니다.
            
                // oModel.read("/Order_Details", {
                //     success: function(oReturn){
                //         //oReturn안에 조회데이터가 json형태로 들어오게 됨
                //         //해당 데이터를 가지고 데이터 가공을 할 수 있음.
                //         //여기서 데이터를 받아와서 데이터 핸들링!!!
                //     }
                // });
                // // 여기다가 데이터 핸들링하면 오류 발생.
            }        
            },
        )
        });


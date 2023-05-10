sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter","sap/ui/model/json/JSONModel",
    "sap/viz/ui5/controls/VizFrame"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel, VizFrame) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                var datas = {
                    list : [
                        {
                            type : 'bar'
                        },
                        {
                            type : 'column'
                        },
                        {
                            type : 'line'
                        },
                        {
                            type : 'donut'
                        }
                    ],
                    // chartType : [
                    //     { 'vizType' : 'bar'},
                    //     { 'vizType' : 'column'},
                    //     { 'vizType' : 'line'},
                    //     { 'vizType' : 'donut'}
                    // ]
                }
                this.getView().setModel(new JSONModel(datas),"typeList");

            },
            onSearch: function(oEvent) {
                /* 검색 조건의 OrderID로 필터가 적용된 차트를 조회 */
                // OrderID에서 입력한 값 가져오기
                /* 선생님 코드 */
                // let oFlattendDataset = this.byId("dataSet");
                // let sSelectedKey = this.byId("searchOrderID").getSelectedKey();
                // let oFilter;

                // if (sSelectedKey) {
                //     oFilter = new Filter("OrderID", "EQ", sSelectedKey);
                //     oFlattendDataset.getBinding("data").filter(oFilter);
                // }

                // const oFilterItems = oEvent.getParameter("selectionset");
                // oComboBox = oFilterItems[0],
                // sSelectedKey = oComboBox.getSelectedKey();

                var sData = this.byId("sOrderID").getSelectedKey();
                var sVizTp = this.byId("cType").getSelectedKey();
                var oFilter ;
                
                if (!sVizTp) {
                    this.byId("cType").setValueState('Error');
                    return;
                } ;
                this.byId("cType").setValueState('None');

                if (sData) {
                    oFilter = new Filter({
                        path : "OrderID",
                        operator : "EQ",
                        value1 : sData
                    });
                } ;
                var iVizFrame = this.byId("idVizFrame"); // [ㅎ처 객체]
                iVizFrame.getDataset().getBinding("data").filter(oFilter); 

                /* Type 별 차트 출력 */
                this.byId("idVizFrame").setVizType(sVizTp);

                /* OrderID에 해당하는 데이터만 출력 */
            },
            onChartSelectData: function (oEvent) {
                
                const oComponent = this.getOwnerComponent(),
                    oRouter = oComponent.getRouter(),
                    // debugger 해서 확인. 선택한 데이터 정보 얻기
                    oData = oEvent.getParameter("data")[0].data,
                    oVizFrame = this.byId("idVizFrame");
                // 차트 선택된거 초기화
                oVizFrame.vizSelection(oData, { clearSelection: true });

                oRouter.navTo("RouteDetail", { // Detail로 이동
                    OrderID: oData.OrderID,
                    ProductID: oData.ProductID,
                });
            }
        });
    });

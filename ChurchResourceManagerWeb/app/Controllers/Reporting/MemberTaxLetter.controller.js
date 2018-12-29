(function () {

    "use strict";

    angular.module("app")
        .controller("memberTaxLetterController", memberTaxLetterController);

    memberTaxLetterController.$inject = ["taxLetterDataService", "$filter", "usSpinnerService"];

    function memberTaxLetterController(taxLetterDataService, $filter, usSpinnerService) {
        var vm = this;

        vm.generateTaxLetters = generateTaxLetters;
        vm.getMemberTithesLetter = getMemberTithesLetter;
        vm.memberTithes = [];
        vm.memberInfo = {};
        vm.showLetters = false;
        vm.totalTithes = 0;
        vm.noResults = false;

        ////////////////////
        function getMemberTithesLetter(searchType, startDate, endDate, familyId, memberId) {
            usSpinnerService.spin("spinner-1");
            var year = $filter("date")(endDate, "yyyy");
            if (memberId === undefined)
                memberId = 0;

            taxLetterDataService.getMemberGiving(memberId, `1/1/${year}`, `12/31/${year}`)
                .then(function (response) {
                    vm.noResults = false;
                    vm.letterData = response.data;
                    if (vm.letterData.length === 0)
                        vm.noResults = true;

                    vm.year = year;
                    vm.letterDate = new Date();
                    generateTaxLetters();
                    usSpinnerService.stop("spinner-1");
                });
        }

        function generateTaxLetters() {

            var dd = {
                content: [],
                styles: {
                    header: {
                        fontSize: 12,
                        alignment: "right"
                    },
                    standard: {
                        fontSize: 12
                    }, tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    },
                    textHeader: {
                        fontSize: 18
                    }
                }

            };

            angular.forEach(vm.letterData, function (member, key, obj) {
                var header = {
                    text: [
                        "Iglesia de Dios Agua en el Desierto\n",
                        "5401 W Burnham Street\n",
                        "Milwaukee, WI 53219\n\n"
                    ],
                    style: "header"
                };

                var date = {
                    text: $filter("date")(new Date(), "MM/dd/yyyy") + "\n\n",
                    style: "standard"
                };

                var addressee = {
                    text: `Dear ${member.MemberName},\n\n`
                };

                var body = {
                    text: [
                        "We thank God for you! Your gifts to Iglesia de Dios Agua en el Desierto throughout 2018 are gratefully acknowledged. \n\n",
                        "Because of your contributions, our congregation has been able to support the work of Jesus Christ locally, regionally, and around the world. \n\n",
                        `Attached is an itemized statement of your contributions for ${vm.year}, according to our records.\n\n`,
                        "If you have any concerns about the accuracy of this information, please let us know. For income tax purposes, it's important for us to state here that you did not receive any goods or services in return for any of these contributions other than intangible religious benefits. You made these gifts out of your own generosity and commitment to Jesus Christ.\n\n",
                        `Our records show that your total contributions for the year of ${vm.year} are ${$filter('currency')(member.TotalAmount)}.\n\n`,
                        "Once again, thank you for your generous commitment to the work of Jesus Christ through this church.\n\n",
                        "Sincerely,\n\n\n\n",
                        "Rev. Efrain Rodriguez Jr\n\n"
                    ]
                };

                var pageBreak = {
                    text: "",
                    pageBreak: "before"
                };
                var donationDetailHeader = {
                    text: "Itemized Contributions\n\n",
                    style: "textHeader"
                };

                var donationDetail = {
                    style: "tableExample",
                    table: {
                        widths: [80, 80, 50, 280],
                        body: [
                            ["Date", "Amount", "Check Number", "Comments"]
                        ]
                    }
                };

                angular.forEach(member.MemberGiving, function (donation, key, obj) {
                    var grid = [donation.DonationDate, $filter('currency')(donation.DonationAmount), donation.IsCheck ? donation.CheckNumber.toString() : "", donation.Comments];
                    donationDetail.table.body.push(grid);
                });
                dd.content.push(header, date, addressee, body, pageBreak, donationDetailHeader, donationDetail, pageBreak);
            });

            pdfMake.createPdf(dd).download("test.pdf");
        }
    }

})();
using System.Web.Optimization;

namespace ChurchResourceManagerWeb
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.min.js",
                "~/Scripts/angular-messages.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js",
                "~/Scripts/angular-sanitize.min.js",
                "~/Scripts/mg/packages/angular-ui/mask.min.js",
                "~/Scripts/angular-animate.min.js",
                "~/Scripts/angular-cookies.min.js",
                "~/Scripts/angular-spinner.min.js",
                "~/Scripts/angular-file-saver.bundle.min.js"
                ));


            //add bundle for business logic scripts related to app
            bundles.Add(new ScriptBundle("~/bundles/ChurchResourceManagerApp")
                .Include("~/app/app.js")
                .IncludeDirectory("~/app/Controllers/", "*.controller.js", true)
                .IncludeDirectory("~/app/Core/", "*.service.js", false)
                .IncludeDirectory("~/app/Components/", "*.component.js", true)
                .IncludeDirectory("~/app/Directives/", "*.directive.js", true)
                .IncludeDirectory("~/app/Filters/", "*.filter.js", true)
                .IncludeDirectory("~/app/Services/", "*.service.js", true)
            );

            bundles.Add(new ScriptBundle("~/bundles/JasmineTests")
                .IncludeDirectory("~/app/", "*.spec.js", true)
            );

            //add bundle for client side unit testing
            bundles.Add(new ScriptBundle("~/bundles/ClientSideUnitTesting").Include(
                "~/Scripts/Jasmine/jasmine.js",
                "~/Scripts/Jasmine/jasmine-html.js",
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/Jasmine/boot.js",
                "~/Scripts/angular-mocks.js"
                ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                "~/Content/toastr.css"));

            bundles.Add(new ScriptBundle("~/bundles/notifications").Include(
                "~/Scripts/toastr.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/JavaScriptUtilities").Include(
                "~/Scripts/pdfmake/pdfmake.min.js",
                "~/Scripts/pdfmake/vfs_fonts.js",
                "~/Scripts/html2canvas.min.js"));
        }
    }
}

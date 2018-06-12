using System;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ChurchResourceManagerWeb.Controllers;

namespace ChurchResourceManager.Tests.Controllers
{
    [TestClass]
    public class TithingControllerTest
    {
        [TestMethod]
        public void AddTithes()
        {
            // Arrange
            var controller = new TithingController();

            // Act
            var result = controller.AddTithes() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}

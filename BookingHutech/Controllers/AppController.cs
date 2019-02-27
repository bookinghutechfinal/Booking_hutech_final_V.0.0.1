using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookingHutech.Controllers
{
    public class AppController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult App()
        { 
            return View();
        }
    }
}

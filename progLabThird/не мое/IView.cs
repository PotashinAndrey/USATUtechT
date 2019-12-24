using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prog_lab3
{
     interface IView
    {
        IModel Model { get; set; }
        void UpdateView();
    }
}

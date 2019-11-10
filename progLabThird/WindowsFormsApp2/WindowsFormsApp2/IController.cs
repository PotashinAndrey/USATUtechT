using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp2
{
    interface IController
    {
        IModel Model { get; set; }
        void AddView(IView v);
        void Add();
        void Remove();
    }
}

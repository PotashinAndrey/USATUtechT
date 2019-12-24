using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace prog_lab3
{
    class LabelView : IView
    {
        Label l;
        IModel model;
        public IModel Model { get; set; }
        public LabelView(Label i)
        {
            this.l = i;
        }

        public void UpdateView()
        {
            l.Text = Model.Count.ToString();
        }
    }
}

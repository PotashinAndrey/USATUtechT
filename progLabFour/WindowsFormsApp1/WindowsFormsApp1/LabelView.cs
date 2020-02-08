using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
   public class LabelView : IView
    {
        Label l;
        IModel model;
        public IModel Model { get => model; set => model = value; }

        public LabelView(Label l)
        {
            this.l = l;
        }

        public void UpdateView()
        {
            l.Text = Model.Count.ToString();
        }
    }
}

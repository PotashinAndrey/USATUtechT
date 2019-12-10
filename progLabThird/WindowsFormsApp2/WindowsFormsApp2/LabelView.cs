using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp2
{
    class LabelView : IView
    {
        Label l;

        public LabelView(Label l)
        {
            this.l = l;
        }

        public IModel Model { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }

        IModel model;

        public void SetModel(IModel model) {
            this.model = model;
        }

        public void UpdateView()
        {
            l.Text = Model.Count.ToString();
        }


    }
}

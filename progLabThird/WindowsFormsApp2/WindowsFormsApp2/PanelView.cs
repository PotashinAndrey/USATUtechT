using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Windows.Forms;

namespace WindowsFormsApp2
{
    class PanelView : Panel, IView
    {

        public IModel Model { get; set; }

        public void UpdateView()
        {
            Invalidate();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            if (Model == null) return;
            Graphics g = e.Graphics;
            foreach (Node n in Model.AllNodes)
            {
                g.DrawEllipse(Pens.Red, n.X * 20, n.Y * 20, 20, 20);
            }
        }
    }
}

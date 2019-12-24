using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Drawing;

namespace prog_lab3
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
            foreach(Node n in Model.AllNodes)
            {
                if (n.Clicked == true)
                {
                    g.DrawEllipse(Pens.Green, n.X * 20, n.Y * 20, 20, 20);
                }
                else
                {
                    g.DrawEllipse(Pens.Red, n.X * 20, n.Y * 20, 20, 20);
                }
            }
        }
        protected override void OnMouseClick(MouseEventArgs e)
        {
            base.OnMouseClick(e);
        }
    }
}

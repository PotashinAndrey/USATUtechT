using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Drawing;

namespace prog_lab3
{
    class MyDataGrid : IView
    {
        public IModel Model { get; set; }
        DataGridView l;
        public delegate void Noder(int x, int y);
        public event Noder Changer;

        public void L(DataGridView i)
        {
            this.l = i;
        }
        public void UpdateView()
        
        {
                l.AutoGenerateColumns = true;
                l.DataSource = Model.AllNodes.ToArray();

        }
    }
}

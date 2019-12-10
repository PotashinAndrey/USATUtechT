using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp2
{

    public partial class Form1 : Form
    {
        
        public class Controller : IController
        {
            public IModel Model { get => model; set => this.model = value; }
            List<IView> views = new List<IView>();
            IModel model;

            static Random r = new Random();

            public void Add()
            {
                model.AddNode(r.Next(100));
            }

            public void AddView(IView v)
            {
                views.Add(v);
            }

            public void Remove()
            {

                model.RemoveLastNode();
            }

        }

        public Form1()
        {
            InitializeComponent();
            IView labView;
            labView = new LabelView(label1);
            AddView(labView);
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void Button1_Click(object sender, EventArgs e)
        {
            Add();
        }

        private void Button2_Click(object sender, EventArgs e)  
        {

        }

    }


}



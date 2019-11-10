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
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        
    }

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
}



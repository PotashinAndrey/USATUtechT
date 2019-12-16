using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace labKbab5
{
    class Data
    {
        ICollection<string> history = new List<string>();

        public ICollection<string> History {
            get
            {
                return history;
            }
        }

        public string Text { get; set; }    
        public string FileName { get; set; }
        public System.Text.RegularExpressions.Match Match { get; set; }

        internal void ReadFromFile(string fileName)
        {
            if (fileName.Length == 0 && FileName.Length == 0)
            {
                return;
            }

            if (fileName.Length == 0)
            {
                using (StreamReader sr = new StreamReader(FileName))
                {
                    Text = sr.ReadToEnd().Replace("\r", ""); //стандартный символ конца строки
                }
            } else
            {
                using (StreamReader sr = new StreamReader(fileName))
                {
                    Text = sr.ReadToEnd().Replace("\r", ""); //стандартный символ конца строки
                }
            }
        }

        internal void Find(string re)
        {
            this.Match = Regex.Match(this.Text, re);
        }

        internal void Next()
        {
            Match = Match?.NextMatch();
        }

        public void SaveConfig()
        {
            using (StreamWriter sw = new StreamWriter("config.txt"))
            {
                sw.WriteLine(FileName);
            }
            using (StreamWriter sww = new StreamWriter("path.txt"))
            {
                sww.WriteLine(String.Join("@", history));
            }
        }

        public void LoadConfig()
        {
            try
            {
                using (StreamReader sr = new StreamReader("config.txt"))
                {
                    FileName = sr.ReadLine();
                }
                using (StreamReader srr = new StreamReader("path.txt"))
                {
                    string s = srr.ReadLine();
                    if (s != null && s.Length > 0)
                    {
                        foreach (string h in s.Split('@')) history.Add(h);
                    }
                }
            }
            catch (IOException ex)
            {
                Console.WriteLine("Не удалось считать настройки.");
            }
        }

        public void AddHistory(string s)
        {
            history.Add(s);

        }

        public IDictionary<string, int> FirstLetterCounts()
        {
            SortedDictionary<string, int> counts = new SortedDictionary<string, int>();
            Regex r = new Regex(@"(\b[А-Яа-яЁёA-Za-z])");
            foreach (Match m in r.Matches(Text))
            {
                string b = m.Groups[1].Value.ToUpper();
                if (counts.ContainsKey(b))
                {
                    counts[b]++;
                }
                else
                {
                    counts[b] = 1; // при чтении было бы исключение «ключ не найден»
                }
            }
            return counts;
        }


        //
    }
}
